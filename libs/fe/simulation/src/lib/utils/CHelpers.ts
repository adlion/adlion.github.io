import { AxesHelper, GridHelper, Scene } from 'three';

export class CHelpers {
  constructor(scene: Scene) {
    const axes = new AxesHelper(3);
    const helper = new GridHelper(6);
    scene.add(axes, helper);
  }
}
