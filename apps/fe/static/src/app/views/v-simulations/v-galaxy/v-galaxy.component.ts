import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GUI } from 'dat.gui';
import {
  AdditiveBlending,
  AmbientLight,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Color,
  Fog,
  Mesh,
  Points,
  PointsMaterial,
  ShaderMaterial,
  SphereBufferGeometry,
  sRGBEncoding,
  Texture,
} from 'three';
import { CAssets, ICResources, Simulation } from '@noi/fe/simulation';
@Component({
  selector: 'personal-v-galaxy',
  templateUrl: './v-galaxy.component.html',
  styleUrls: ['./v-galaxy.component.scss'],
})
export class VGalaxyComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  fragment = `
varying vec3 vertexNormal;
uniform vec3 color;

void main(){
    float intensity = pow(0.02 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(color, 0.15) * intensity;
}
`;

  vertex = `
varying vec3 vertexNormal;

void main(){
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.7);
}

`;
  geometry!: BufferGeometry;
  material!: PointsMaterial;
  stars: Points | null = null;
  diffussedLightMaterial!: ShaderMaterial;
  parameters = {
    count: 25000,
    size: 0.03,
    radius: 5,
    branches: 7,
    spin: 1,
    randomness: 0.8,
    randomnessPower: 8,
    thickness: 3,
    centerColor: '#ff0000',
    edgeColor: '#0000ff',
  };
  gui = new GUI();
  texture!: Texture;
  simulation!: Simulation;

  ngAfterViewInit(): void {
    const sources: ICResources = [
      {
        name: 'star',
        type: 'textureLaoder',
        path: 'assets/textures/particles/1.png',
      },
    ];
    const assetsInstance = new CAssets(sources);

    this.simulation = new Simulation(
      this.canvas.nativeElement,
      'onDemand'
    );
    //Do not allow user to move galaxy outside camera max distance
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.simulation.cameraInstance.controls!.maxDistance = 25;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.simulation.cameraInstance.controls!.minDistance = 1;
    this.simulation.cameraInstance.camera.position.y = 4;
    // this.simulation.cameraInstance.camera.position.x = 35;
    this.simulation.cameraInstance.camera.position.z = 8;

    //Fog
    this.simulation.sceneInstance.fog = new Fog(0xdfe9f3, 1000, 5000);

    //If assets are loaded render the scene
    assetsInstance.on('loaded', () => {
      this.texture = assetsInstance.assets[0][sources[0].name] as Texture;
      this.texture.encoding = sRGBEncoding;
      this.debugGalaxy();
      this.initDiffusedLight();
      this.initGalaxy();
    });
  }

  initDiffusedLight() {
    this.diffussedLightMaterial = new ShaderMaterial({
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
      blending: AdditiveBlending,
      uniforms: {
        color: {
          value: new Color(this.parameters.centerColor),
        },
      },
      side: BackSide,
      extensions: { derivatives: true },
    });
    const sphere = new Mesh(
      new SphereBufferGeometry(4.5, 20, 20),
      this.diffussedLightMaterial
    );

    this.simulation.sceneInstance.add(sphere);
  }

  debugGalaxy() {
    this.gui
      .add(this.parameters, 'count')
      .min(100)
      .max(100000)
      .step(100)
      .name('Quantity')
      .onFinishChange(() => this.generateGalaxy());
    this.gui
      .add(this.parameters, 'radius')
      .min(0.02)
      .max(20)
      .step(0.01)
      .name('Stars size')
      .onFinishChange(() => this.generateGalaxy());
    this.gui
      .add(this.parameters, 'branches')
      .min(3)
      .max(20)
      .step(1)
      .name('Spirals Nr.')
      .onFinishChange(() => this.generateGalaxy());
    this.gui
      .add(this.parameters, 'spin')
      .min(0)
      .max(5)
      .step(0.5)
      .name('Spin angle')
      .onFinishChange(() => this.generateGalaxy());
    this.gui
      .add(this.parameters, 'randomness')
      .min(0.2)
      .max(2)
      .step(0.2)
      .name('Diffussion')
      .onFinishChange(() => this.generateGalaxy());
    this.gui
      .add(this.parameters, 'thickness')
      .min(1)
      .max(3)
      .step(0.2)
      .name('Thickenss')
      .onFinishChange(() => this.generateGalaxy());
    this.gui
      .add(this.parameters, 'randomnessPower')
      .min(1)
      .max(10)
      .step(0.2)
      .name('Randomness')
      .onFinishChange(() => this.generateGalaxy());

    this.gui
      .addColor(this.parameters, 'centerColor')
      .name('Center Color')
      .onFinishChange((value) => {
        this.diffussedLightMaterial.uniforms['color'].value.set(value);
        this.generateGalaxy();
      });

    this.gui
      .addColor(this.parameters, 'edgeColor')
      .name('Edge Color')
      .onFinishChange(() => this.generateGalaxy());
    this.gui.close();
  }

  initGalaxy() {
    this.material = new PointsMaterial({
      map: this.texture,
      size: this.parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true,
    });
    this.generateGalaxy();
  }

  generateGalaxy() {
    /**
     * Dispose old stars if properties have changed
     */
    if (this.stars !== null) {
      /**
       * If changes are being made on material
       * than it needs to be disposed
       */
      this.geometry?.dispose();
      // this.material?.dispose();
      this.simulation.sceneInstance.remove(this.stars);
    }

    const positions = new Float32Array(this.parameters.count * 3);
    const colors = new Float32Array(this.parameters.count * 3);
    const colorInside = new Color(this.parameters.centerColor);
    const colorOutside = new Color(this.parameters.edgeColor);
    for (let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * this.parameters.radius;
      const spinAngle = radius * this.parameters.spin;

      //Full circle divided by number of required branches
      //so fo each point we attach a branch
      const branchAngle =
        ((i % this.parameters.branches) / this.parameters.branches) *
        Math.PI *
        2;

      //random within limits
      //This equation will give curves to branches
      //! If better understood make a note
      const randomX =
        Math.pow(Math.random(), this.parameters.randomnessPower) *
        (Math.random() < 0.5
          ? this.parameters.thickness
          : -this.parameters.thickness) *
        this.parameters.randomnessPower;
      const randomY =
        Math.pow(Math.random(), this.parameters.randomnessPower) *
        (Math.random() < 0.5
          ? this.parameters.thickness
          : -this.parameters.thickness) *
        this.parameters.randomnessPower;
      const randomZ =
        Math.pow(Math.random(), this.parameters.randomnessPower) *
        (Math.random() < 0.5
          ? this.parameters.thickness
          : -this.parameters.thickness) *
        this.parameters.randomnessPower;
      //Position stars using branches angle, distance and curbe
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      //Color
      //Make a clone of colorInside so it will not be changed when calculating colors in middle
      //someColor.lerp will change the colors in someColor
      //Check below
      const mixedColor = colorInside.clone();
      //Calculate color between center and edge color by using distance from center
      mixedColor.lerp(colorOutside, radius / this.parameters.radius);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    this.geometry = new BufferGeometry();
    this.geometry.setAttribute('position', new BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new BufferAttribute(colors, 3));

    this.stars = new Points(this.geometry, this.material);
    this.stars.updateMatrix();
    this.simulation.sceneInstance.add(this.stars);
    //Update renderer to detect changes
    this.simulation.update();
  }
}
