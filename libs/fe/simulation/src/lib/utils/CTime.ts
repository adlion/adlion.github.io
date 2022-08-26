import { CEventEmitter } from './CEventEmitter';

export class CTime extends CEventEmitter {
 private  start: number;
 private current: number;
  elapsedTime: number;
  delta: number;
  constructor() {
    super();

    //getDelta on Three js is in seconds
    //We do not use three js getDelta due to an issue it has with getElapsedTime
    this.start = Date.now()/1000;
    this.current = this.start;
    this.elapsedTime = 0;
    this.delta = 16;
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now()/1000;
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsedTime = this.current - this.start;

    this.trigger('tick');
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
