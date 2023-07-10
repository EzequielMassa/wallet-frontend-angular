import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  createNewDepositPaymentAction,
  createNewTransferAction,
  getAllUsers,
} from '../../../../../pages/wallet/pages/home/store/actions/accounts.action';
import {
  allUsersSelector,
  userAccountsSelector,
} from '../../../../../pages/wallet/pages/home/store/selectors/home.selectors';
import { DepositPaymentInterface } from '../../../../../pages/wallet/pages/home/types/DepositPayment.interface';
import { TransferInterface } from '../../../../../pages/wallet/pages/home/types/Transfer.interface';
import { UserAccountInterface } from '../../../../../pages/wallet/pages/home/types/userAccount.interface';
import { UsersDTOInterface } from '../../../../../pages/wallet/pages/home/types/usersDTO.interface';
import { MyErrorStateMatcher } from '../../../../utils/error-state-mantcher';
import { GenericModalComponent } from '../../../generic-modal/components/generic-modal/generic-modal.component';
import { GenericModalService } from '../../services/generic-modal.service';
import {PersistanceService} from "../../../../services/persistance.service";

@Component({
  selector: 'wal-deposit-payment-form',
  templateUrl: './deposit-payment-form.component.html',
  styleUrls: ['./deposit-payment-form.component.css'],
})
export class DepositPaymentFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  userAccounts$!: Observable<UserAccountInterface[]>;
  users$!: Observable<UsersDTOInterface[]>;
  activeAccount!: number;
  subscriptionModal: Subscription;
  matcher = new MyErrorStateMatcher();
  selected:number;
  userAccountSelected: number = 0;
  @Input('formType') formTypeProps!: any;
  @Output('formEvent') formEventProps = new EventEmitter<any>();
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private modalService: GenericModalService,
    public dialogRef: MatDialogRef<GenericModalComponent>,
    public persistanceService: PersistanceService
  ) {
    this.activeAccount = this.persistanceService.get('activeAccount');
    this.selected = this.activeAccount;
    this.userAccounts$ = this.store.pipe(select(userAccountsSelector));
    this.subscriptionModal = this.modalService.data.subscribe((data) => {
      if (data == true) {
        this.onSubmit();
      }
    });
  }

  ngOnInit(): void {
    if (
      this.formTypeProps.toLowerCase() == 'deposit' ||
      this.formTypeProps.toLowerCase() == 'payment'
    ) {
      this.initializeForm();
    } else {
      this.initializeTransferForm();
    }

  }

  private initializeForm() {
    this.form = this.fb.group({
      accountId: [null, Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: [
        '',

        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      type: this.formTypeProps.toLowerCase(),
    });
  }

  private initializeTransferForm() {
    this.store.dispatch(getAllUsers());
    this.users$ = this.store.pipe(select(allUsersSelector));
    this.form = this.fb.group({
      accountId: [null, Validators.required],
      destinyAccount: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      type: this.formTypeProps.toLowerCase(),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (
        this.formTypeProps.toLowerCase() == 'deposit' ||
        this.formTypeProps.toLowerCase() == 'payment'
      ) {
        const request: DepositPaymentInterface = this.form.value;
        this.store.dispatch(createNewDepositPaymentAction({ request }));
        this.dialogRef.close();
      } else {
        const request: TransferInterface = this.form.value;
        this.store.dispatch(createNewTransferAction({ request }));
        this.dialogRef.close();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptionModal.unsubscribe();
  }
}
