import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetingCardAutumnComponent } from './greeting-card-autumn.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GreetingCardAutumnComponent],
  imports: [CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: GreetingCardAutumnComponent,
      },
    ]),
  ],
})
export class GreetingCardAutumnModule {}
