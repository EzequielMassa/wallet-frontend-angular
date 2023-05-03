import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from 'src/app/pages/wallet/pages/home/services/account.service';
import {UserAccountInterface} from "./types/userAccount.interface";
import {Observable, Subscription} from "rxjs";
import {select, Store} from '@ngrx/store';
import {
  getCurrentMonthExpensesAction,
  getCurrentMonthIncomingsAction,
  getLatestAccountMovementsAction,
  getUserAccountsAction
} from "./store/actions/accounts.action";
import {
  currentMonthExpensesSelector,
  currentMonthIncomingsSelector,
  isLoadingSelector,
  latestAccountMovementsSelector,
  userAccountsSelector
} from "./store/selectors/home.selectors";
import {OperationInterface} from "../../../../shared/types/operation.interface";
import {PersistanceService} from 'src/app/shared/services/persistance.service';
import {ChartData} from "chart.js";
import {BarCharDataInterface} from "../../../../shared/types/barCharData.interface";


@Component({
  selector: 'wal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  userAccounts$!: Observable<UserAccountInterface[]>;
  activeAccount!: number;
  activeAccountSubscription$!: Subscription;
  isLoading$!: Observable<boolean>;
  title: string = "Ultimos movimientos"
  latestAccountMovements$!: Observable<OperationInterface[]>;
  barCharLabels!: string[];
  barCharDataIncomings!: BarCharDataInterface;
  barCharDataExpenses!: BarCharDataInterface;
  barChar!: ChartData<'bar'>
  currentMonthIncomings$!: Observable<any>;
  currentMonthExpenses$!: Observable<any>;
  incomingSubscription$!: Subscription;
  expensesSubscription$!: Subscription;
  totalIncoming!: number;
  totalExpenses!: number;


  slideConfig = {

    dots: true,
    centerMode: true,
    slidesToShow: 1,
    variableWidth: true,
    swipeToSlide: true,
    arrows: true,
    prevArrow: ('.prev-arrow'),
    nextArrow: ('.next-arrow'),

    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  }

  constructor(private accountService: AccountService, private store: Store, private persistanceService: PersistanceService) {
    this.store.dispatch(getUserAccountsAction())
    this.initializeValues()
  }


  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.userAccounts$ = this.store.pipe(select(userAccountsSelector))
    if (this.persistanceService.get('activeAccount') == null) {
      this.activeAccountSubscription$ = this.userAccounts$.subscribe((result) => {
        console.log(result[0].accountId)
        this.activeAccount = result[0].accountId
      })
    } else {
      this.activeAccount = this.persistanceService.get('activeAccount')
    }
    this.setActive(this.activeAccount)
    this.latestAccountMovements$ = this.store.pipe(select(latestAccountMovementsSelector))
    this.currentMonthIncomings$ = this.store.pipe(select(currentMonthIncomingsSelector))
    this.currentMonthExpenses$ = this.store.pipe(select(currentMonthExpensesSelector))
    this.incomingSubscription$ = this.currentMonthIncomings$.subscribe((monthIncomings) => {
      this.barCharLabels = [monthIncomings[0]];
      this.barCharDataIncomings = {data: [monthIncomings[1]], label: 'Ingresos'}
      this.totalIncoming = monthIncomings[1]
    })
    this.expensesSubscription$ = this.currentMonthExpenses$.subscribe((monthExpenses) => {
      this.barCharDataExpenses = {data: [monthExpenses[1]], label: 'Egresos'}
      this.totalExpenses = monthExpenses[1]
      this.barChar = {
        labels: this.barCharLabels,
        datasets: [
          this.barCharDataIncomings,
          this.barCharDataExpenses,
        ],

      }
    })
  }

  setActive(accountId: number) {
    this.activeAccount = (accountId);
    this.persistanceService.set('activeAccount', accountId)
    this.store.dispatch(getLatestAccountMovementsAction({activeAccount: this.activeAccount}))
  }

  ngOnInit(): void {
    this.store.dispatch(getCurrentMonthIncomingsAction())
    this.store.dispatch(getCurrentMonthExpensesAction())
  }

  ngOnDestroy(): void {
    this.incomingSubscription$.unsubscribe();
    this.expensesSubscription$.unsubscribe()
  }
}
