import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VGalaxyComponent } from './v-galaxy/v-galaxy.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VGalaxyComponent],
  imports: [CommonModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'galaxy',
        pathMatch: 'full',
      },
      {
        path: 'galaxy',
        component: VGalaxyComponent,
      },
    ]),
  ],
})
export class VSimulationsModule {}
