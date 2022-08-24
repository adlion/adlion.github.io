import {
  Camera,
  CineonToneMapping,
  PCFSoftShadowMap,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from 'three';

export class CRenderer {
  renderer: WebGLRenderer;
  constructor(
    sizes: { width: number; height: number; pixelRatio: number },
    canvas: HTMLCanvasElement
  ) {
    this.renderer = this.init(sizes, canvas);
  }

  private init(
    sizes: { width: number; height: number; pixelRatio: number },

    canvas: HTMLCanvasElement
  ) {
    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });

    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = sRGBEncoding;
    renderer.toneMapping = CineonToneMapping;
    renderer.toneMappingExposure = 1.75;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setClearColor('#211d20', 0);
    renderer.setSize(sizes.width, sizes.height, false);
    renderer.setPixelRatio(sizes.pixelRatio);

    return renderer;
  }

  resize(sizes: { width: number; height: number; pixelRatio: number }) {
    this.renderer.setSize(sizes.width, sizes.height, false);
    this.renderer.setPixelRatio(sizes.pixelRatio);
  }
  update(scene: Scene, camera: Camera) {
    this.renderer.render(scene, camera);
  }
}
