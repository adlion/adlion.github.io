import { CubeTexture, CubeTextureLoader, Texture, TextureLoader } from 'three';
import { ICResources } from '../models/simulation-models';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CEventEmitter } from './CEventEmitter';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export class CAssets extends CEventEmitter {
  private gltfLoader: GLTFLoader;
  private textureLoader: TextureLoader;
  private cubeTextLoader: CubeTextureLoader;
  private loaded = 0;
  assets: Array<{ [name: string]: CubeTexture | GLTF | Texture }> = [];
  constructor(assets: ICResources) {
    super();
    this.gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/assets/model-loaders/draco/');
    this.gltfLoader.setDRACOLoader(dracoLoader);
    this.textureLoader = new TextureLoader();
    this.cubeTextLoader = new CubeTextureLoader();
    this.fetchAssets(assets);
  }

  private fetchAssets(sources: ICResources) {
    for (const source of [...sources]) {
      switch (source.type) {
        case 'cubeTexture':
          this.cubeTextLoader.load(source.path, (file) => {
            this.sourceLoaded(source.name, file);
          });
          break;
        case 'gltfLoader':
          this.gltfLoader.load(source.path, (file) => {
            this.sourceLoaded(source.name, file);
          });
          break;
        case 'textureLaoder':
          this.textureLoader.load(source.path, (file) => {
            this.sourceLoaded(source.name, file);
          });
          break;
        default:
          console.error(`Source type unknown.`);
          break;
      }
    }
  }

  private sourceLoaded(name: string, asset: CubeTexture | GLTF | Texture) {
    this.assets.push({ [name]: asset });
    this.trigger('loaded', [this.loaded]);
    this.loaded++;
  }
}
