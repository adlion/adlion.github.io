import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'noi-ring-chart',
  templateUrl: './ring-chart.component.html',
  styleUrls: ['./ring-chart.component.scss'],
})
export class RingChartComponent implements AfterViewInit {
  @ViewChild('chartRef') chartRef!: ElementRef<HTMLDivElement>;
  @Input() settings: ICRingChart = { value: 0, label: 'null' };
  constructor(private renderer: Renderer2) {}
  value = 0;
  ngAfterViewInit(): void {
    this.renderer.setAttribute(
      this.chartRef.nativeElement,
      'aria-label',
      `${this.value}%`
    );
    this.animate()
  }

  animate(){
    requestAnimationFrame(() => {
      if (this.value < this.settings.value) {
        this.value++;
        this.renderer.setAttribute(
          this.chartRef.nativeElement,
          'style',
          `background-image: conic-gradient( var(--color-filled) calc(${this.value} * 1%),var(--color-bg) 0%);`
        );
        this.animate()
      }
    });
  }
}

interface ICRingChart {
  value: number;
  label: string | number | null;
}
