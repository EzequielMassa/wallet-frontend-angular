import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from "rxjs";
import {UserAccountInterface} from "../../../../../pages/wallet/pages/home/types/userAccount.interface";
import {select, Store} from "@ngrx/store";
import {userAccountsSelector} from "../../../../../pages/wallet/pages/home/store/selectors/home.selectors";
import {GenericModalService} from "../../services/generic-modal.service";
import {createNewDepositPaymentAction} from "../../../../../pages/wallet/pages/home/store/actions/accounts.action";
import {DepositPaymentInterface} from "../../../../../pages/wallet/pages/home/types/DepositPayment.interface";
import {MyErrorStateMatcher} from "../../../../utils/error-state-mantcher";
import {MatDialogRef} from "@angular/material/dialog";
import {GenericModalComponent} from "../../../generic-modal/components/generic-modal/generic-modal.component";


@Component({
  selector: 'wal-deposit-payment-form',
  templateUrl: './deposit-payment-form.component.html',
  styleUrls: ['./deposit-payment-form.component.css']
})
export class DepositPaymentFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  userAccounts$!: Observable<UserAccountInterface[]>;
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

  }


  onSubmit() {
    if (this.form.valid) {
      const request: DepositPaymentInterface = this.form.value
      this.store.dispatch(createNewDepositPaymentAction({request}))
      this.dialogRef.close()
    }
  }

  ngOnDestroy(): void {
    this.subscriptionModal.unsubscribe()
  }
}
