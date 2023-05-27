import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {CurrentUserInterface} from "../../../../../../shared/types/currentUser.interface";
import {currentUserSelector} from "../../../auth/store/selectors/auth.selector";
import {Router} from "@angular/router";
import {RegisterRequestInterface} from "../../../auth/types/registerRequest.interface";
import {updateProfileAction} from "../../../auth/store/actions/update-profile.action";
import {fadeInDownOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'wal-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  animations: [	fadeInDownOnEnterAnimation()]
})
export class EditProfileComponent implements OnInit, OnDestroy {
  updateUserForm!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  currentUser$!: Observable<CurrentUserInterface | null>;
  currentUser!: CurrentUserInterface | null;
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
  }


  ngOnInit(): void {
    this.inializeValues();
    this.initializeLoginForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      password: ['', [Validators.minLength(4)]],
      urlImg: [this.currentUser?.urlImg]
    });
  }

  private inializeValues(): void {
    /*   this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));*/
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.subscription = this.currentUser$.pipe().subscribe((currentUser) => this.currentUser = currentUser);
  }

  navigate(): void {
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    this.updateUserForm.addControl('email', new FormControl(this.currentUser?.email));

    if (this.updateUserForm.valid) {
      const request: RegisterRequestInterface = this.updateUserForm.value;
      this.store.dispatch(updateProfileAction({request}));
    }
  }
}
