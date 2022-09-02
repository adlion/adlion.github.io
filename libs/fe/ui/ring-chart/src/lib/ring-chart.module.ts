import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RingChartComponent } from './ring-chart/ring-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RingChartComponent],
  exports: [RingChartComponent],
})
export class RingChartModule {}
