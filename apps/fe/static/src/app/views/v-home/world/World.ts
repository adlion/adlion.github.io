import { PerspectiveCamera, WebGLRenderer } from 'three';
import { Scene } from 'three';
import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { lightDirectional, lightAmbient } from './components/lights';
import { createRenderer } from './systems/renderer';
import { createAxesHelper, createGridHelper } from './components/helpers';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';
import { createControls } from './systems/controls';
// These variables are module-scoped: we cannot access them
// from outside the module
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let loop: Loop;

class World {
  get sizes(): { width: number; height: number; aspectRatio: number } {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
    };
  }

  constructor(container: HTMLDivElement) {
    renderer = createRenderer();
    container.append(renderer.domElement);
    camera = createCamera({ aspect: this.sizes.width });

    const controls = createControls(camera, renderer.domElement);
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    loop.updatables.push(controls);
    const { mainLight } = lightDirectional({});
    const { ambientLight } = lightAmbient({});
    scene.add(ambientLight, mainLight);

    scene.add(createAxesHelper(), createGridHelper());

    const resizer = new Resizer(container, camera, renderer);
    this.init();
  }

  async init() {
    // const { parrot } = await loadBirds();
    // move the target to the center of the front bird
    // controls.target.copy(parrot.position);
    // scene.add(cube.model);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
