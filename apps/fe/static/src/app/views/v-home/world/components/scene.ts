import { Color, Scene } from 'three';

function createScene(background = 'skyblue') {
  const scene = new Scene();
  scene.background = new Color(background);

  return scene;
}

export { createScene };
