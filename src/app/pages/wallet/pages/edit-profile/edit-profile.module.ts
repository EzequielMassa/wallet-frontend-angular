import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {EditProfileRoutingModule} from "./edit-profile-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {StoreModule} from "@ngrx/store";
import {homeReducers} from "../home/store/reducers/home.reducers";
import {EffectsModule} from "@ngrx/effects";
import {AccountsEffect} from "../home/store/effects/accounts.effect";
import {RouterModule} from "@angular/router";
import {GenericTitleModule} from "../../../../shared/modules/generic-title/generic-title.module";


@NgModule({
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    EditProfileRoutingModule,
    ReactiveFormsModule,
    GenericTitleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forFeature('home', homeReducers),
    EffectsModule.forFeature([AccountsEffect]),
  ]
})
export class EditProfileModule {
}
