import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IncomingsComponent} from "./incomings.component";

const routes: Routes = [
  {
    path: '',
    component: IncomingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomingsRoutingModule {
}
