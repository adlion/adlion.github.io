import { CEventEmitter } from './CEventEmitter';

export class CTime extends CEventEmitter {
 private  start: number;
 private current: number;
  elapsedTime: number;
  delta: number;
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsedTime = 0;
    this.delta = 16;
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsedTime = this.current - this.start;

    this.trigger('tick');
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
