import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PasswordForgotRequestInterface} from "../../../../../../types/passwordForgotRequest.interface";
import {select, Store} from "@ngrx/store";
import {passwordForgotAction} from "../../../../../../store/actions/password-forgot.actions";
import {Observable} from "rxjs";
import {isSubmittingSelector} from "../../../../../../store/selectors/auth.selector";
import {ThemePalette} from "@angular/material/core";
import {ProgressBarMode} from "@angular/material/progress-bar";

@Component({
  selector: 'wal-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit{
  passwordForgotForm!: FormGroup;
  isSubmitting$!:Observable<boolean>;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'indeterminate';
  constructor(private fb: FormBuilder,private router: Router,private store:Store) {

  }

  ngOnInit(): void {
    this.initializePasswordForgotForm();
    this.initializeValues();
  }

  initializePasswordForgotForm(): void {
    this.passwordForgotForm = this.fb.group({
      mailTo: ['', [Validators.required, Validators.email]],
    });
  }
  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }
  cancel(): void {
    this.router.navigate(['/auth/login']);
  }
  onSubmit(): void {
    if (this.passwordForgotForm.valid) {

      const request: PasswordForgotRequestInterface = this.passwordForgotForm.value
      this.store.dispatch(passwordForgotAction({request}))
    }
  }
}
