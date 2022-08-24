import { PerspectiveCamera, Scene, TOUCH } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export class CCamera {
  camera: PerspectiveCamera;
  controls: OrbitControls | undefined;
  constructor(
    sizes: { width: number; height: number },
    scene: Scene,
    canvas: HTMLCanvasElement | null
  ) {
    this.camera = this.init(sizes);
    if (canvas != null) {
      this.controls=this.setOrbitControls(this.camera, canvas);
    }
    scene.add(this.camera);
  }

  private init(sizes: { width: number; height: number }) {
    const camera = new PerspectiveCamera(
      35,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(6, 4, 8);
    return camera;
  }
  setOrbitControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    return controls
  }
  resize(sizes: { width: number; height: number }) {
    this.camera.aspect = sizes.width / sizes.height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    if (this.controls) {
      this.controls.update();
    }
  }
}
