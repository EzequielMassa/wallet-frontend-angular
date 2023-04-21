import {Component, OnInit} from '@angular/core';
import {AccountService} from 'src/app/pages/wallet/pages/home/services/account.service';
import {UserAccountInterface} from "./types/userAccount.interface";
import {Observable} from "rxjs";
import {select, Store} from '@ngrx/store';
import {getLatestAccountMovementsAction, getUserAccountsAction} from "./store/actions/accounts.action";
import {
  isLoadingSelector,
  latestAccountMovementsSelector,
  userAccountsSelector
} from "./store/selectors/home.selectors";
import {OperationInterface} from "../../../../shared/types/operation.interface";
import {PersistanceService} from 'src/app/shared/services/persistance.service';
import {ChartData} from "chart.js";
import {BarCharDataInterface} from "../../../../shared/types/barCharData.interface";
import * as moment from "moment";


@Component({
  selector: 'wal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  userAccounts$!: Observable<UserAccountInterface[]>;
  activeAccount!: number;
  isLoading$!: Observable<boolean>;
  title: string = "Ultimos movimientos"
  latestAccountMovements$!: Observable<OperationInterface[]>;
  currentMonth = moment().get("month") + 1
  currentYear = moment().get("year")
  barCharLabels!: string[];
  barCharDataIncomings!: BarCharDataInterface;
  barCharDataExpenses!: BarCharDataInterface;
  barChar!: ChartData<'bar'>


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

  ngOnInit(): void {
    this.accountService.getAccountIncomingsByMonthAndYear(this.activeAccount, this.currentMonth, this.currentYear).subscribe((data) => {
      this.barCharLabels = [data[0]];
      this.barCharDataIncomings = {data: [data[1]], label: 'Ingresos'}

    })

    this.accountService.getAccountExpensesByMonthAndYear(this.activeAccount, this.currentMonth, this.currentYear).subscribe((data) => {
      this.barCharDataExpenses = {data: [data[1]], label: 'Egresos'}
      this.barChar = {
        labels: this.barCharLabels,
        datasets: [
          this.barCharDataIncomings,
          this.barCharDataExpenses
        ]
      }
    })


  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.userAccounts$ = this.store.pipe(select(userAccountsSelector))
    this.latestAccountMovements$ = this.store.pipe(select(latestAccountMovementsSelector))
    this.activeAccount = this.persistanceService.get('activeAccount')
    this.setActive(this.activeAccount)

  }

  setActive(accountId: number) {
    this.activeAccount = (accountId);
    this.persistanceService.set('activeAccount', accountId)
    this.store.dispatch(getLatestAccountMovementsAction({activeAccount: this.activeAccount}))
  }


}
