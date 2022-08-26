/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CAssets, Simulation } from '@noi/fe/simulation';
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PlaneBufferGeometry,
  SphereBufferGeometry,
} from 'three';
import * as CANON from 'cannon-es';
@Component({
  selector: 'personal-v-home',
  templateUrl: './v-home.component.html',
  styleUrls: ['./v-home.component.scss'],
})
export class VHomeComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  simulation!: Simulation;
  constructor() {}
  ngAfterViewInit(): void {
    this.simulation = new Simulation(this.canvas.nativeElement, {
      autoUpdate: 'auto',
      orbitControl: true,
    });
    this.simulation.cameraInstance.camera.position.set(-3, 3, 3);
    this.simulation.onTick = ({ elapsedTime, delta }) => {
      this.update(elapsedTime, delta);
    };

    const assetLoader = new CAssets([
      { name: 'hamburger', type: 'gltfLoader', path: 'assets/hamburger.glb' },
    ]);

    console.log(assetLoader.assets)
    assetLoader.on('loaded',(a)=>{
      console.log(a)
    })
    this.init();
  }
  mesh2!: Mesh;
  init() {
    const material = new MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      envMapIntensity: 0.5,
    });
    this.mesh2 = new Mesh(new PlaneBufferGeometry(10, 10), material);
    this.mesh2.rotation.x = -0.5 * Math.PI;
    // this.simulation.scene.add(this.mesh2);

    const directionaLight = new DirectionalLight('#ffffff', 3);

    directionaLight.position.set(0.25, 3, -2.25);
    this.simulation.scene.add(directionaLight);

    const testSphere = new Mesh(
      new SphereBufferGeometry(1, 32, 32),
      new MeshStandardMaterial()
    );

    this.simulation.scene.add(testSphere);
  }

  update(elapsedTime: number, delta: number) {}
}
