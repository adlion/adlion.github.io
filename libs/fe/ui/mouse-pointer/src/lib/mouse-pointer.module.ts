import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MousePointerComponent } from './mouse-pointer/mouse-pointer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MousePointerComponent],
  exports: [MousePointerComponent],
})
export class MousePointerModule {}
