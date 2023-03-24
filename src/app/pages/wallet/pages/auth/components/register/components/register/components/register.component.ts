import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {select, Store} from "@ngrx/store";
import {registerAction} from "../../../../../store/actions/register.action";
import {RegisterRequestInterface} from "../../../../../types/registerRequest.interface";
import {Observable} from "rxjs";
import {isSubmittingSelector} from "../../../../../store/selectors/auth.selector";

@Component({
  selector: 'wal-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;


  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.initializeLoginForm();
    this.inializeValues()
  }

  initializeLoginForm(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  private inializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))

  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const request: RegisterRequestInterface = this.registerForm.value


      this.store.dispatch(registerAction({request}))
    }

  }


}


