import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterModule} from 'src/app/pages/wallet/pages/auth/components/register/components/register/register.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./components/register/components/login/login.module').then(
        (l) => l.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/register/components/register/register.module').then(
        (r) => RegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
