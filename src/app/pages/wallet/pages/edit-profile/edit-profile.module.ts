import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {EditProfileRoutingModule} from "./edit-profile-routing.module";


@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    EditProfileRoutingModule
  ]
})
export class EditProfileModule {
}
