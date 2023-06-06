import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {select, Store} from '@ngrx/store';
import {registerAction} from '../../../../../store/actions/register.action';
import {RegisterRequestInterface} from '../../../../../types/registerRequest.interface';
import {Observable} from 'rxjs';
import {backendErrorsSelector, isSubmittingSelector} from '../../../../../store/selectors/auth.selector';
import {slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation} from "angular-animations";
import {BackendErrorsInterface} from "../../../../../../../../../shared/types/backendErrors.interface";

@Component({
  selector: 'wal-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    slideInUpOnEnterAnimation(),
    slideOutDownOnLeaveAnimation(),
  ]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.initializeLoginForm();
    this.inializeValues();
  }

  initializeLoginForm(): void {
    this.registerForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      urlImg: ['https://cdn-icons-png.flaticon.com/128/149/149071.png']
    });
  }

  private inializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(backendErrorsSelector));
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const request: RegisterRequestInterface = this.registerForm.value;
      this.store.dispatch(registerAction({request}));
    }
  }
}
