import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'noi-mouse-pointer',
  templateUrl: './mouse-pointer.component.html',
  styleUrls: ['./mouse-pointer.component.scss'],
})
export class MousePointerComponent implements OnInit {
  @ViewChild('cursorBig') cursorBig!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorSmall') cursorSmall!: ElementRef<HTMLDivElement>;
  constructor() {}

  @HostListener('window:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.onMouseMove(event);
  }

  ngOnInit(): void {}
  // Move the cursor
  onMouseMove(e: any) {
    gsap.to('.cursor__ball--small', {
      duration: 0.5,
      x: e.pageX ,
      y: e.pageY,
      scale:0.5,
      ease:'back.out(0.5)'
    })
    gsap.to('.cursor__ball--small', {
      scale:1,
    });
  }

  // Hover an element
  onMouseHover() {
    TweenMax.to('.cursor__ball--big', 0.3, {
      scale: 4,
    });
  }
  onMouseHoverOut() {
    TweenMax.to('.cursor__ball--big', 0.3, {
      scale: 1,
    });
  }
}
