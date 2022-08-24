import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Updatable } from '../../systems/Updatable';

import { setupModel } from './setupModel';

async function loadBirds() {
  const loader = new GLTFLoader();

  const [planeData] = await Promise.all([loader.loadAsync('/assets/aa.glb')]);
  const updatable = new Updatable(planeData, () => {
    console.log('called plane');
  });

  const parrot = setupModel(updatable);

  return {
    parrot,
  };
}

export { loadBirds };
