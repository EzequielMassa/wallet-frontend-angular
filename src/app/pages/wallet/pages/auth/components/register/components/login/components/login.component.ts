import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {isSubmittingSelector} from "../../../../../store/selectors/auth.selector";
import {LoginRequestInterface} from "../../../../../types/loginRequest.interface";
import {loginAction} from "../../../../../store/actions/login.actions";

@Component({
  selector: 'wal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.initializeLoginForm();
    this.initializeValues()
  }

  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  private initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const request: LoginRequestInterface = this.loginForm.value
      this.store.dispatch(loginAction({request}))
    }
  }
}
