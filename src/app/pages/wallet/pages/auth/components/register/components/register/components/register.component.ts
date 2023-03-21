import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterRequestInterface} from "../../../../../store/types/registerRequest.interface";
import {select, Store} from "@ngrx/store";
import {registerAction} from "../../../../../store/actions/register.action";
import {Observable} from "rxjs";
import {isSubmittingSelector} from "../../../../../store/selectors/auth.selector";

@Component({
  selector: 'wal-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  isSubmitting$!:Observable<boolean>;
  constructor(private fb: FormBuilder, private store:Store) {}
  ngOnInit(): void {
    this.initializeLoginForm();
    this.initializeValues()
  }

  initializeLoginForm(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  initializeValues(){
    this.isSubmitting$ = this.store.pipe(
     select(isSubmittingSelector)
    )
  }

  onSubmit(): void {
   const request:RegisterRequestInterface = {
     user: this.registerForm.value
   }
  this.store.dispatch(registerAction({request}))
  }
}


