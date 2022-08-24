import { BehaviorSubject, throttleTime } from 'rxjs';
import {
  Clock,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  Vector3,
  WebGLRenderer,
  WebGLRendererParameters,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createAxesHelper, createGridHelper } from './helpers';

export class WorldService {
  private _delta$ = new BehaviorSubject<number>(0);
  private delta$ = this._delta$.asObservable();
  private camera;
  private scene;
  private renderer;
  private isAnimating = false;

  clock = new Clock();
  private loopId = 0;

  constructor(world: IWorld) {
    const renderSettings: WebGLRendererParameters = {
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    };
    this.renderer = new WebGLRenderer(renderSettings);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.physicallyCorrectLights=true
    this.camera = new PerspectiveCamera();
    this.camera.position.set(0, 5, 20);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.scene = new Scene();
  }

  init(  container: HTMLElement) {
   container.append(this.renderer.domElement);
    this.setSize();
    this.adjustCamera({});
    // world.helpers
      this.scene.add(createAxesHelper(), createGridHelper())
    //   : null;
    this.initControls();
    this.start();
  }

  private adjustCamera({ fov = 2, near = 1, far = 50 }) {
    this.camera.fov = fov;
    this.camera.near = near;
    this.camera.far = far;
  }
  private setSize() {
    this.delta$.pipe(throttleTime(500)).subscribe((_) => {
      const canvas = this.renderer.domElement;
      // check canvas sizes
      /**
       * Modern mobile devices have high pixel ratios as high as 5
       * Limiting the max pixel ratio to 2 or 3 on these devices. 
       */
      const pixelRatio = Math.min(window.devicePixelRatio,3);
      const width = (canvas.clientWidth * pixelRatio) | 0;
      const height = (canvas.clientHeight * pixelRatio) | 0;
      const needResize = canvas.width !== width || canvas.height !== height;
      // adjust size to match after resizing
      if (needResize) {
        // resize canvas respecting height and width we set on css
        this.renderer.setSize(width, height, false);
        this.renderer.setPixelRatio(pixelRatio);

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      }
    });
  }

  stop() {
    this._delta$.complete();
    this.isAnimating = false;
  }

  start() {
    this.isAnimating = true;
    this.tick();
  }

  private tick() {
    const delta = this.clock.getDelta();
    this._delta$.next(delta);
    this.renderer.render(this.scene, this.camera);
    if (this.isAnimating) {
      this.loopId = window.requestAnimationFrame(() => this.tick());
    } else {
      window.cancelAnimationFrame(this.loopId);
    }
  }

  initControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    // this.delta$.pipe(throttleTime(500)).subscribe((_) => {
    controls.update();
    // });
  }
}
export interface IWorld {
  renderer?: WebGLRendererParameters;
  helpers?: boolean;
}
