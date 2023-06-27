import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  collapseOnLeaveAnimation,
  expandOnEnterAnimation,
} from 'angular-animations';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../../../../../../../../shared/types/backendErrors.interface';
import { passwordForgotAction } from '../../../../../../store/actions/password-forgot.actions';
import {
  backendErrorsPasswordForgotSelector,
  isSubmittingSelector,
  submitedSuccessfullySelector,
} from '../../../../../../store/selectors/auth.selector';
import { PasswordForgotRequestInterface } from '../../../../../../types/passwordForgotRequest.interface';

@Component({
  selector: 'wal-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css'],
  animations: [expandOnEnterAnimation(), collapseOnLeaveAnimation()],
})
export class PasswordForgotComponent implements OnInit {
  passwordForgotForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'indeterminate';
  isSubmitedSuccessfully$!: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

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
    this.backendErrors$ = this.store.pipe(
      select(backendErrorsPasswordForgotSelector)
    );
    this.isSubmitedSuccessfully$ = this.store.pipe(
      select(submitedSuccessfullySelector)
    );
  }
  cancel(): void {
    this.router.navigate(['/auth/login']);
  }
  onSubmit(): void {
    if (this.passwordForgotForm.valid) {
      const request: PasswordForgotRequestInterface =
        this.passwordForgotForm.value;
      this.store.dispatch(passwordForgotAction({ request }));
    }
  }
}
