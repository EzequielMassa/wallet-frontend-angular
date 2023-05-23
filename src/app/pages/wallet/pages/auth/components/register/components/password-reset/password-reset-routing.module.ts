import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PasswordResetComponent} from "./components/password-reset/password-reset.component";

const routes: Routes = [
  {
    path: ':token',
    component: PasswordResetComponent,
  },
/*  {
    path: 'success',
    component: PasswordForgotSuccessComponent,
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordResetRoutingModule {}
