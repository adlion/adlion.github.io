import { GUI } from 'dat.gui';

export class CDebug {
  active = false;
  ui!: GUI;
  constructor() {
    this.active = window.location.hash === '#debug';

    if (this.active) {
      this.ui = new GUI();
    }
  }
}
