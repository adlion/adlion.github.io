import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./views/v-home/v-home.module').then(
        (module) => module.VHomeModule
      ),
  },
  {
    path: 'greeting-card',
    loadChildren: () =>
      import('./views/v-greeting-cards/v-greeting-cards.module').then(
        (module) => module.VGreetingCardsModule
      ),
  },
  {
    path: 'simulations',
    loadChildren: () =>
      import('./views/v-simulations/v-simulations.module').then(
        (module) => module.VSimulationsModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
