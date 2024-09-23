import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    canActivate: [noAuthGuard],
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'main',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainPageModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
