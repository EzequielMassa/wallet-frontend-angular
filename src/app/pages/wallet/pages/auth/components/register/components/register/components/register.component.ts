import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {select, Store} from '@ngrx/store';
import {registerAction} from '../../../../../store/actions/register.action';
import {RegisterRequestInterface} from '../../../../../types/registerRequest.interface';
import {Observable} from 'rxjs';
import {backendErrorsRegisterSelector, isSubmittingSelector} from '../../../../../store/selectors/auth.selector';
import {flipOnEnterAnimation, slideInUpOnEnterAnimation, slideOutDownOnLeaveAnimation} from "angular-animations";
import {BackendErrorsInterface} from "../../../../../../../../../shared/types/backendErrors.interface";
import {AnimationOptions} from "ngx-lottie";
import {MatDialog} from "@angular/material/dialog";
import {TermsConditionsModalComponent} from "./terms-conditions-modal/terms-conditions-modal.component";

@Component({
  selector: 'wal-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    slideInUpOnEnterAnimation(),
    slideOutDownOnLeaveAnimation(),
    flipOnEnterAnimation(),
  ]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  isTermsAcepted!: boolean;
  options: AnimationOptions = {
    path: '/assets/lottie/lottie-credit-cards.json',
  };
  constructor(private fb: FormBuilder, private store: Store,public dialog: MatDialog) {
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
    this.backendErrors$ = this.store.pipe(select(backendErrorsRegisterSelector));
  }

  openDialog() {
    const dialogRef = this.dialog.open(TermsConditionsModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.isTermsAcepted = result;
      if (this.isTermsAcepted){
        const request: RegisterRequestInterface = this.registerForm.value;
        this.store.dispatch(registerAction({request}));
      }
    });
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      this.openDialog();
    }
  }
}
