import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./pages/auth/guards/auth.guard";

const routes: Routes = [
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
    path: 'ingresos',
    loadChildren: () => import('./pages/incomings/incomings.module').then((i) => i.IncomingsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'egresos',
    loadChildren: () => import('./pages/expenses/expenses.module').then((e) => e.ExpensesModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletRoutingModule {
}
