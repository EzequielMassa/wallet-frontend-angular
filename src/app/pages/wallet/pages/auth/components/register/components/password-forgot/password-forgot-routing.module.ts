import {RouterModule, Routes} from "@angular/router";
import {PasswordForgotComponent} from "./components/password-forgot/password-forgot.component";
import {NgModule} from "@angular/core";
import {PasswordForgotSuccessComponent} from "./components/password-forgot-success/password-forgot-success.component";

const routes: Routes = [
  {
    path: '',
    component: PasswordForgotComponent,
  },
  {
    path: 'success',
    component: PasswordForgotSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordForgotRoutingModule {}
