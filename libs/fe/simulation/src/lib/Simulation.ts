/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Scene } from 'three';
import { CCamera } from './CCamera';
import { CRenderer } from './CRenderer';
import { CSizes } from './utils/CSizes';
import { CTime } from './utils/CTime';
export class Simulation {
  private sizesInstance: CSizes;
  private time: CTime;
  sceneInstance: Scene;
  cameraInstance: CCamera;
  rendererInstance: CRenderer;
  constructor(
    canvas: HTMLCanvasElement,
    autoUpdate: 'onDemand' | 'auto' = 'auto'
  ) {
    this.sizesInstance = new CSizes();
    this.time = new CTime();
    /**
     * Scene
     */
    this.sceneInstance = new Scene();

    /**
     * Camera
     */
    this.cameraInstance = new CCamera(
      this.sizesInstance.sizes,
      this.sceneInstance,
      canvas
    );
    this.rendererInstance = new CRenderer(this.sizesInstance.sizes, canvas);
    /**
     * Resize event
     * This event is central
     * The whole simulation will user @func this.resize()  to synchronize
     * If we are in auto (auto ticking) than resizing will happen instantly
     * In case of rendering on demand we have to call rendering
     */
    this.sizesInstance.on('resize', () => {
      this.sizesInstance.needsResize(
        this.rendererInstance.renderer.domElement,
        () => {
          if (autoUpdate === 'auto') {
            this.resize();
          } else {
            this.resize();
            this.onDemandUpdate();
          }
        }
      );
    });

    /**
     * Time tick event
     */
    if (autoUpdate === 'auto') {
      this.time.on('tick', () => {
        this.update();
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.cameraInstance.controls!.addEventListener('change', () => {
       this.onDemandUpdate()
      });
    }
  }

  onDemandUpdate() {
    requestAnimationFrame(() => this.update());
  }

  private resize() {
    /**
     *! Order matters
     *Renderer cames after Camera
     */
    this.cameraInstance.resize(this.sizesInstance.sizes);
    this.rendererInstance.resize(this.sizesInstance.sizes);
  }

  update() {
    /**
     *! Order matters
     *Renderer cames after Camera
     */
    this.cameraInstance.update();
    this.rendererInstance.update(
      this.sceneInstance,
      this.cameraInstance.camera
    );
  }
}
