import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";
import {currentUserSelector} from "../../../auth/store/selectors/auth.selector";
import {Router} from "@angular/router";

@Component({
  selector: 'wal-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  updateUserForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  currentUser$!: Observable<CurrentUserInterface | null>;
  currentUser!: CurrentUserInterface | null;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.inializeValues();
    this.initializeLoginForm();

  }

  initializeLoginForm(): void {
    this.updateUserForm = this.fb.group({
      firstname: [
        this.currentUser?.firstname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      lastname: [
        this.currentUser?.lastname,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
      urlImg: [this.currentUser?.urlImg]
    });
  }

  private inializeValues(): void {
    /*   this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));*/
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.currentUser$.pipe().subscribe((currentUser) => this.currentUser = currentUser);
  }

  navigate(): void {
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    this.updateUserForm.addControl('email', new FormControl(this.currentUser?.email));
    console.log(this.updateUserForm.value)
    if (this.updateUserForm.valid) {

      /*   const request: RegisterRequestInterface = this.registerForm.value;
         this.store.dispatch(registerAction({request}));*/
    }
  }
}
