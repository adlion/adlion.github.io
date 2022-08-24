import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VHomeComponent } from './v-home.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [VHomeComponent],
  imports: [CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: VHomeComponent,
      },
    ]),
  ],
})
export class VHomeModule {}
