import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'wal-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  passwordResetForm!: FormGroup;
  tokenPassword!: string;
constructor(private router: Router,
            private route: ActivatedRoute,
            private fb:FormBuilder) {
}

  ngOnInit(): void {
    this.tokenPassword = this.route.snapshot.params['token'];
    console.log(this.tokenPassword)
    this.initializeResetPasswordForm();
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
    console.log(this.passwordResetForm.value)
  }
  }

  navigate() {
    this.router.navigate(['/auth/login']);
  }
}
