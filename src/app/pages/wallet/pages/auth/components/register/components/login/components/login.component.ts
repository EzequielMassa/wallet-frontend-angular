import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  backendErrorsSelector,
  isSubmittingSelector,
} from '../../../../../store/selectors/auth.selector';
import { LoginRequestInterface } from '../../../../../types/loginRequest.interface';
import { loginAction } from '../../../../../store/actions/login.actions';
import { AnimationOptions } from 'ngx-lottie';
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  flipOnEnterAnimation,
} from 'angular-animations';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'wal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    flipOnEnterAnimation(),
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  title!: string;
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  options: AnimationOptions = {
    path: '/assets/lottie/lottie-credit-cards.json',
  };

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeLoginForm();
    this.initializeValues();
  }

  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  private initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(backendErrorsSelector));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const request: LoginRequestInterface = this.loginForm.value;
      this.store.dispatch(loginAction({ request }));
    }
  }
}
