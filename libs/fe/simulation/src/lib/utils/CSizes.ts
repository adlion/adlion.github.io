import { CEventEmitter } from './CEventEmitter';

export class CSizes extends CEventEmitter {
  sizes: {
    width: number;
    height: number;
    pixelRatio: number;
  };
  constructor() {
    super();
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    };

    window.addEventListener('resize', () => {
      this.sizes = {
        width: window.innerWidth * 0.5,
        height: window.innerHeight * 0.5,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      };
      this.trigger('resize');
    });
  }

  needsResize(canvas: HTMLCanvasElement, cb: () => void) {
    /**
     * Modern mobile devices have high pixel ratios as high as 5
     * Limiting the max pixel ratio to 2 or 3 on these devices.
     * Keep pixel ratio in here. It might happen user moves window to different screens
     */
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    // adjust size to match after resizing
    if (needResize) {
      this.sizes = {
        width: width,
        height: height,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      };
      cb();
    }
  }
}
