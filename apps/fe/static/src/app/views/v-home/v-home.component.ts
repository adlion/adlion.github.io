import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'personal-v-home',
  templateUrl: './v-home.component.html',
  styleUrls: ['./v-home.component.scss'],
})
export class VHomeComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLDivElement>;
  constructor() {}
 
  ngAfterViewInit(): void {
  }

}
