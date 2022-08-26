/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Scene } from 'three';
import { CCamera } from './CCamera';
import { CRenderer } from './CRenderer';
import { CHelpers } from './utils/CHelpers';
import { COrbitCOntrol } from './utils/COrbitControl';
import { CSizes } from './utils/CSizes';
import { CTime } from './utils/CTime';
interface ISimulationConfig {
  autoUpdate: 'onDemand' | 'auto';
  orbitControl: boolean;
  helpers: boolean;
}
/**
 * @func onDemandUpdate to be called only when @param {Object} simulationConfig.autoUpdate is "auto"
 * onDemandUpdate calls requestAnimationFrame while in case  of  @param {Object} simulationConfig.autoUpdate time instance will call requestAnimationFrame
 */
export class Simulation {
  private size: CSizes;
  private time: CTime;
  private canvas: HTMLCanvasElement;
  private helpers: CHelpers | null = null;
  scene: Scene;
  cameraInstance: CCamera;
  rendererInstance: CRenderer;
  /**
   *To use OrbitControl make sure to initialise by setting simulationConfig orbitControl property to true
   *or calling @func this.initOrbitControls()
   */
  private simulationConfig!: ISimulationConfig;
  orbitContol: COrbitCOntrol | null = null;
  onTick:
    | (({ elapsedTime, delta }: { elapsedTime: number; delta: number }) => void)
    | undefined = undefined;

  constructor(
    canvas: HTMLCanvasElement,
    {
      autoUpdate = 'auto',
      orbitControl = false,
      helpers = false,
    }: Partial<ISimulationConfig>
  ) {
    this.canvas = canvas;
    this.simulationConfig = {
      autoUpdate,
      orbitControl,
      helpers,
    };
    /**
     * Size of canvas
     */
    this.size = new CSizes();

    /**
     * It will init the tick and loop to render
     */
    this.time = new CTime();

    /**
     * Scene
     */
    this.scene = new Scene();

    /**
     * Camera
     */
    this.cameraInstance = new CCamera(this.size.sizes, this.scene);

    /**
     * Render
     */
    this.rendererInstance = new CRenderer(this.size.sizes, this.canvas);

    /**
     * Orbit Control
     */
    if (this.simulationConfig.orbitControl) {
      this.initOrbitControls();
    }

    /** Helpers */
    if (this.simulationConfig.helpers) {
      this.initHelpers();
    }

    /**
     * Resizing event
     */
    this.onResize();

    /**
     * Time tick event
     */
    this.onTimeTicking();
  }

  initOrbitControls() {
    if (this.orbitContol === null) {
      this.orbitContol = new COrbitCOntrol(
        this.canvas,
        this.cameraInstance.camera
      );
    }
  }

  initHelpers() {
    if (this.helpers === null) {
      this.helpers = new CHelpers(this.scene);
    }
  }

  private onTimeTicking() {
    if (this.simulationConfig.autoUpdate === 'auto') {
      this.time.on('tick', () => {
        this.update();
      });
    } else if (this.orbitContol !== null) {
      this.orbitContol.controls.addEventListener('change', () => {
        this.onDemandUpdate();
      });
    }
  }

  private onResize() {
    /**
     * Resize event
     * This event is central
     * The whole simulation will user @func this.resize()  to synchronize
     * If we are in auto (auto ticking) than resizing will happen instantly
     * In case of rendering on demand we have to call render.render to update the screen
     */
    this.size.on('resize', () => {
      this.size.needsResize(this.rendererInstance.renderer.domElement, () => {
        if (this.simulationConfig.autoUpdate === 'auto') {
          this.resize();
        } else {
          this.resize();
          this.onDemandUpdate();
        }
      });
    });
  }

  private resize() {
    /**
     *! Order matters
     *Renderer cames after Camera
     */
    this.cameraInstance.resize(this.size.sizes);
    this.rendererInstance.resize(this.size.sizes);
  }

  onDemandUpdate() {
    if (this.simulationConfig.autoUpdate!=="auto") {
      requestAnimationFrame(() => this.update());
    }
  }

  private update() {
    if (this.onTick) {
      this.onTick.call(undefined, {
        elapsedTime: this.time.elapsedTime,
        delta: this.time.delta,
      });
    }

    if (this.orbitContol !== null) {
      this.orbitContol.update();
    }

    /**
     *Renderer cames last
     */

    this.rendererInstance.update(this.scene, this.cameraInstance.camera);
  }
}
