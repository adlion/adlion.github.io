import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  ViewChild,
} from '@angular/core';
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'personal-v-galaxy',
  templateUrl: './v-galaxy.component.html',
  styleUrls: ['./v-galaxy.component.scss'],
})
export class VGalaxyComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  geometry: BufferGeometry | null = null;
  material: PointsMaterial | null = null;
  stars: Points | null = null;
  parameters = {
    count: 25000,
    size: 0.02,
    sizeAttenuation: true,
    depthWrite: false,
    blending: AdditiveBlending,
    radius: 5,
    branches: 5,
    spin: 1,
    randomness: 0.5,
    randomnessPower: 3.2,
    thickness: 1,
    centerColor: '#ff6030',
    edgeColor: '#1b3984',
  };

  get sizes(): { width: number; height: number; aspectRatio: number } {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
    };
  }

  clock = new Clock();
  renderer!: WebGLRenderer;
  camera = new PerspectiveCamera(
    75,
    this.sizes.aspectRatio,
    0.1,
    5
  );

  controls!: OrbitControls;
  scene: Scene = new Scene();
  gui = new GUI();

  @HostListener('dblclick', ['$event']) doubleClick(e: MouseEvent) {
    if (!this.document.fullscreenElement) {
      this.canvas.nativeElement.requestFullscreen();
    } else {
      this.document.exitFullscreen();
    }
  }

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) {
    this.tick();
  }

  @HostListener('window:resize', ['$event']) resize(e: Event) {
    this.refreshCamera();
    this.refreshRenderer();
    this.tick()
  }
  ngAfterViewInit(): void {
    //Renderer
    this.renderer = new WebGLRenderer({
      canvas: this.canvas.nativeElement,
    });
    this.refreshRenderer();
    //Camera
    this.camera.position.y = 25;
    this.scene.add(this.camera);
    this.initOrbitalControl();
    this.debugGalaxy();
    this.generateGalaxy(this.parameters);
    this.tick();
  }

  refreshRenderer() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  refreshCamera() {
    this.camera.aspect = this.sizes.aspectRatio;
    this.camera.updateProjectionMatrix();
  }

  initOrbitalControl() {
    //Orbit controller
    this.controls = new OrbitControls(this.camera, this.canvas.nativeElement);
    this.controls.enableDamping = true;
  }

  debugGalaxy() {
    this.gui
      .add(this.parameters, 'count')
      .min(100)
      .max(100000)
      .step(100)
      .onFinishChange(() => this.generateGalaxy(this.parameters));
    this.gui
      .add(this.parameters, 'radius')
      .min(0.02)
      .max(20)
      .step(0.01)
      .onFinishChange(() => this.generateGalaxy(this.parameters));
    this.gui
      .add(this.parameters, 'branches')
      .min(3)
      .max(20)
      .step(1)
      .onFinishChange(() => this.generateGalaxy(this.parameters));
    this.gui
      .add(this.parameters, 'spin')
      .min(0)
      .max(5)
      .step(0.5)
      .onFinishChange(() => this.generateGalaxy(this.parameters));
    this.gui
      .add(this.parameters, 'randomness')
      .min(0.2)
      .max(2)
      .step(0.2)
      .onFinishChange(() => this.generateGalaxy(this.parameters));
    this.gui
      .add(this.parameters, 'thickness')
      .min(1)
      .max(3)
      .step(0.2)
      .onFinishChange(() => this.generateGalaxy(this.parameters));
    this.gui
      .add(this.parameters, 'randomnessPower')
      .min(1)
      .max(5)
      .step(0.2)
      .onFinishChange(() => this.generateGalaxy(this.parameters));

    this.gui
      .addColor(this.parameters, 'centerColor')
      .onFinishChange(() => this.generateGalaxy(this.parameters));

    this.gui
      .addColor(this.parameters, 'edgeColor')
      .onFinishChange(() => this.generateGalaxy(this.parameters));
  }

  generateGalaxy(parameters: any) {
    if (this.stars !== null) {
      this.geometry?.dispose();
      this.material?.dispose();
      this.scene.remove(this.stars);
    }
    this.geometry = new BufferGeometry();

    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const colorInside = new Color(parameters.centerColor);
    const colorOutside = new Color(parameters.edgeColor);
    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;

      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? parameters.thickness : -parameters.thickness) *
        parameters.randomnessPower;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? parameters.thickness : -parameters.thickness) *
        parameters.randomnessPower;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? parameters.thickness : -parameters.thickness) *
        parameters.randomnessPower;
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      //Color

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    this.geometry.setAttribute('position', new BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new BufferAttribute(colors, 3));

    this.material = new PointsMaterial({
      size: parameters.size,
      sizeAttenuation: parameters.sizeAttenuation,
      depthWrite: parameters.depthWrite,
      blending: parameters.blending,
      vertexColors: true,
    });

    this.stars = new Points(this.geometry, this.material);

    this.scene.add(this.stars);
  }
  //Animations
  tick() {
    this.controls.update();

    this.renderer.render(this.scene, this.camera);

    // window.requestAnimationFrame(() => this.tick());
  }
}
