import {  PerspectiveCamera } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
function createControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
    const controls = new OrbitControls(camera, canvas);
  
    controls.enableDamping = true;
    const updatable = new Updatable(controls,()=>controls.update())
    return updatable;
  }
  
  export { createControls };
  

