import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./pages/auth/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/auth.module').then((a) => a.AuthModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((a) => a.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'income',
    loadChildren: () => import('./pages/incomings/incomings.module').then((i) => i.IncomingsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'expenses',
    loadChildren: () => import('./pages/expenses/expenses.module').then((e) => e.ExpensesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/edit',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then((e) => e.EditProfileModule),
    canActivate: [AuthGuard],
  },
  {
  path: '**',
  loadChildren: () => import('./pages/page-error/page-error.module').then((p) => p.PageErrorModule)
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletRoutingModule {
}
