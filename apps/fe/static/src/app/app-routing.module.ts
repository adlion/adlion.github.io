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
    path: 'greeting-card-autumn',
    loadChildren: () =>
      import('./views/greeting-card-autumn/greeting-card-autumn.module').then(
        (module) => module.GreetingCardAutumnModule
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
