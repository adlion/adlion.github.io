import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VGreetingCardAutumnComponent } from './v-greeting-card-autumn/v-greeting-card-autumn.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VGreetingCardAutumnComponent],
  imports: [CommonModule,
    RouterModule.forChild([
      {
        path: 'autumn',
        component: VGreetingCardAutumnComponent,
      },
      {
        path: '',
        redirectTo: 'autumn',
        pathMatch: 'full',
      },
    ]),
  ],
})
export class VGreetingCardsModule { }
