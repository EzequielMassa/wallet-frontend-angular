import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((a) => a.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'ingresos',
    loadChildren: () => import('./pages/incomings/incomings.module').then((i) => i.IncomingsModule),
  },
  {
    path: 'egresos',
    loadChildren: () => import('./pages/expenses/expenses.module').then((e) => e.ExpensesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletRoutingModule {
}
