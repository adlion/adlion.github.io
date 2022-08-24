import { AnimationMixer } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Updatable } from "../../systems/Updatable";

function setupModel(data:Updatable<GLTF>) {
    const model = data.model.scene.children[0];
    const clip = data.model.animations[0];

    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();
    data.tick=(delta) => mixer.update(delta);
    return model;
  }
  
  export { setupModel };
  