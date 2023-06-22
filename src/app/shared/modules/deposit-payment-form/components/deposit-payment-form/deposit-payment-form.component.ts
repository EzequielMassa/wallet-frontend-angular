import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from "rxjs";
import {UserAccountInterface} from "../../../../../pages/wallet/pages/home/types/userAccount.interface";
import {select, Store} from "@ngrx/store";
import {
  allUsersSelector,
  userAccountsSelector
} from "../../../../../pages/wallet/pages/home/store/selectors/home.selectors";
import {GenericModalService} from "../../services/generic-modal.service";
import {
  createNewDepositPaymentAction,
  createNewTransferAction, getAllUsers
} from "../../../../../pages/wallet/pages/home/store/actions/accounts.action";
import {DepositPaymentInterface} from "../../../../../pages/wallet/pages/home/types/DepositPayment.interface";
import {MyErrorStateMatcher} from "../../../../utils/error-state-mantcher";
import {MatDialogRef} from "@angular/material/dialog";
import {GenericModalComponent} from "../../../generic-modal/components/generic-modal/generic-modal.component";
import {TransferInterface} from "../../../../../pages/wallet/pages/home/types/Transfer.interface";
import {UsersDTOInterface} from "../../../../../pages/wallet/pages/home/types/usersDTO.interface";


@Component({
  selector: 'wal-deposit-payment-form',
  templateUrl: './deposit-payment-form.component.html',
  styleUrls: ['./deposit-payment-form.component.css']
})
export class DepositPaymentFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  userAccounts$!: Observable<UserAccountInterface[]>;
  users$!: Observable<UsersDTOInterface[]>;
  subscriptionModal: Subscription;
  matcher = new MyErrorStateMatcher();
  selected = 'option1';
  @Input('formType') formTypeProps!: any;
  @Output('formEvent') formEventProps = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private store: Store, private modalService: GenericModalService, public dialogRef: MatDialogRef<GenericModalComponent>,) {
    this.userAccounts$ = this.store.pipe(select(userAccountsSelector))
    this.subscriptionModal = this.modalService.data.subscribe(data => {
      if (data == true) {
        this.onSubmit()
      }
    });
  }

  ngOnInit(): void {
    if (this.formTypeProps.toLowerCase() == 'deposit' || this.formTypeProps.toLowerCase() == 'payment') {
      this.initializeForm();
    } else {
      this.initializeTransferForm()
    }

  }

  private initializeForm() {
    this.form = this.fb.group({
      accountId: [null, Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      type: this.formTypeProps.toLowerCase()
    })
  }

  private initializeTransferForm() {
    this.store.dispatch(getAllUsers());
    this.users$ = this.store.pipe(select(allUsersSelector))
    this.users$.subscribe(result => {
      console.log(result)
    })
    this.form = this.fb.group({
      accountId: [null, Validators.required],
      destinyAccount: ['', [Validators.required, Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      type: this.formTypeProps.toLowerCase()
    })
  }


  onSubmit() {
    if (this.form.valid) {
      if (this.formTypeProps.toLowerCase() == 'deposit' || this.formTypeProps.toLowerCase() == 'payment') {
        const request: DepositPaymentInterface = this.form.value
        this.store.dispatch(createNewDepositPaymentAction({request}))
        this.dialogRef.close()
      } else {
        const request: TransferInterface = this.form.value
        this.store.dispatch(createNewTransferAction({request}))
        this.dialogRef.close()
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptionModal.unsubscribe()
  }
}
