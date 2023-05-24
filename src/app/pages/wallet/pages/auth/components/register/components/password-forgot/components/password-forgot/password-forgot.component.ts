import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PasswordForgotRequestInterface} from "../../../../../../types/passwordForgotRequest.interface";
import {select, Store} from "@ngrx/store";
import {passwordForgotAction} from "../../../../../../store/actions/password-forgot.actions";
import {Observable} from "rxjs";
import {
  backendErrorsSelector,
  isSubmittingSelector,
  submitedSuccessfullySelector
} from "../../../../../../store/selectors/auth.selector";
import {ThemePalette} from "@angular/material/core";
import {ProgressBarMode} from "@angular/material/progress-bar";
import {BackendErrorsInterface} from "../../../../../../../../../../shared/types/backendErrors.interface";
import {collapseOnLeaveAnimation, expandOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'wal-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css'],
  animations: [
    expandOnEnterAnimation(),
    collapseOnLeaveAnimation(),
  ]
})
export class PasswordForgotComponent implements OnInit{
  passwordForgotForm!: FormGroup;
  isSubmitting$!:Observable<boolean>;
  backendErrors$!:Observable<BackendErrorsInterface | null>;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'indeterminate';
  isSubmitedSuccessfully$!:Observable<boolean>;
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
    this.backendErrors$ = this.store.pipe(select(backendErrorsSelector))
    this.isSubmitedSuccessfully$ = this.store.pipe(select(submitedSuccessfullySelector))
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
