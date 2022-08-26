import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';

export class COrbitCOntrol {
  controls: OrbitControls;
  constructor(canvas: HTMLCanvasElement, camera: PerspectiveCamera) {
    this.controls = this.init(camera, canvas);
  }

  init(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    return controls;
  }

  update() {
    if (this.controls) {
      this.controls.update();
    }
  }
}
