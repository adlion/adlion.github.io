import { PerspectiveCamera, Scene } from 'three';
export class CCamera {
  camera: PerspectiveCamera;
  constructor(
    sizes: { width: number; height: number },
    scene: Scene,
  ) {
    this.camera = this.init(sizes);
    scene.add(this.camera);
  }

  private init(sizes: { width: number; height: number }) {
    const camera = new PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    
    camera.position.set(0,0,3);
    return camera;
  }
 
  resize(sizes: { width: number; height: number }) {
    this.camera.aspect = sizes.width / sizes.height;
    this.camera.updateProjectionMatrix();
  }
}
