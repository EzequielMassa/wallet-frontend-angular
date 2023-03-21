import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterRequestInterface} from "../../../../../store/types/registerRequest.interface";
import {Store} from "@ngrx/store";
import {registerAction} from "../../../../../store/actions/register.action";

@Component({
  selector: 'wal-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private store:Store) {}
  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
   const request:RegisterRequestInterface = {
     user: this.registerForm.value
   }
  this.store.dispatch(registerAction({request}))
  }
}


