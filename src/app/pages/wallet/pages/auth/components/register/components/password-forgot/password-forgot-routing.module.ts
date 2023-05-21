import {RouterModule, Routes} from "@angular/router";
import {PasswordForgotComponent} from "./components/password-forgot/password-forgot.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: PasswordForgotComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordForgotRoutingModule {}
