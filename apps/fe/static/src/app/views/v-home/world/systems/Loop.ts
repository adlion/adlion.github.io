/* eslint-disable @typescript-eslint/member-ordering */
import { Clock, PerspectiveCamera, WebGLRenderer } from 'three';

class Loop {
  private loopId = 0;
  private isAnimating = false;
  camera;
  scene;
  renderer;
  updatables: Array<any> = [];
  delta = 0;
  clock = new Clock();
  constructor(camera: PerspectiveCamera, scene: any, renderer: WebGLRenderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }
  stop() {
    this.isAnimating = false;
  }

  start() {
    this.isAnimating = true;
    this.tick();
  }

  tick() {
    this.delta = this.clock.getDelta();
    for (const object of this.updatables) {
      object.tick(this.delta);
    }
    this.renderer.render(this.scene, this.camera);
    if (this.isAnimating) {
      this.loopId = window.requestAnimationFrame(() => this.tick());
    } else {
      window.cancelAnimationFrame(this.loopId);
    }
  }
}

export { Loop };
