import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordResetRequestInterface} from "../../../../../../types/passwordResetRequest.interface";
import {select, Store} from "@ngrx/store";
import {passwordResetAction} from "../../../../../../store/actions/password-reset.actions";
import {BackendMessagesInterface} from "../../../../../../../../../../shared/types/backendMessages.interface";
import {Observable} from "rxjs";
import {
  backendMessagesSelector,
  passwordResetSubmitedSuccessfullySelector,
  submitedSuccessfullySelector
} from "../../../../../../store/selectors/auth.selector";

@Component({
  selector: 'wal-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  passwordResetForm!: FormGroup;
  tokenPassword!: string;
  backendMessages!:Observable<BackendMessagesInterface|null>
  isSubmitedSuccessfully$!:Observable<boolean>
constructor(private router: Router,
            private route: ActivatedRoute,
            private fb:FormBuilder,
            private store:Store) {
}

  ngOnInit(): void {
    this.tokenPassword = this.route.snapshot.params['token'];
    this.initializeValues();
    this.initializeResetPasswordForm();

  }

  initializeValues(): void{
    this.backendMessages = this.store.pipe(select(backendMessagesSelector))
    this.isSubmitedSuccessfully$ = this.store.pipe(select(passwordResetSubmitedSuccessfullySelector))
  }

  initializeResetPasswordForm() {
    this.passwordResetForm = this.fb.group({
      password: ['',[Validators.required, Validators.minLength(4)]],
      confirmPassword: ['',[Validators.required, Validators.minLength(4)]]
    },
      {validator: this.passwordMatchValidator}
    )
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  }
  onSubmit() {
  if(this.passwordResetForm.valid){
    this.passwordResetForm.addControl('tokenPassword', new FormControl(this.tokenPassword));
    const request:PasswordResetRequestInterface = this.passwordResetForm.value
    this.store.dispatch(passwordResetAction({request}))
  }
  }

  navigate() {
    this.router.navigate(['/auth/login']);
  }
}
