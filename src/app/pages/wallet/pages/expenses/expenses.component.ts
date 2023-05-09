import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {OperationInterface} from "../../../../shared/types/operation.interface";
import {ChartData} from "chart.js";
import * as moment from "moment/moment";
import {AccountService} from "../home/services/account.service";
import {select, Store} from "@ngrx/store";
import {PersistanceService} from "../../../../shared/services/persistance.service";
import {
  getCurrentMonthExpensesAction,
  getCurrentYearExpensesAction,
  getLatestAccountMovementsAction
} from "../home/store/actions/accounts.action";
import {
  currentMonthExpensesSelector,
  currentYearExpensesSelector,
  latestAccountMovementsSelector
} from "../home/store/selectors/home.selectors";

@Component({
  selector: 'wal-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, OnDestroy {

  totalMonthExpenses!: number;
  yearExpensses: number[] = [];
  totalYearExpenses!: number;
  private activeAccount!: number;
  currentMonthExpenses$!: Observable<any>;
  currentYearExpenses$!: Observable<any>;
  expensesMonthSubscription$!: Subscription;
  expensesYearSubscription$!: Subscription;
  title!: string;
  expensesAccountMovements$!: Observable<OperationInterface[]>;
  barChar!: ChartData<'bar'>
  barCharLabels: string[] = [];
  currentYear: number = moment().get('year')


  constructor(private accountService: AccountService, private store: Store, private persistanceService: PersistanceService) {
    this.store.dispatch(getCurrentMonthExpensesAction())
    this.store.dispatch(getCurrentYearExpensesAction())
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy(): void {
  }

  initializeValues() {
    this.activeAccount = this.persistanceService.get('activeAccount')
    this.getTotalMonthExpenses()
    this.getTotalYearExpenses()
    this.getYearExpenses()
  }

  getTotalMonthExpenses() {
    this.currentMonthExpenses$ = this.store.pipe(select(currentMonthExpensesSelector))
    this.expensesMonthSubscription$ = this.currentMonthExpenses$.subscribe((monthExpenses) => {
      this.totalMonthExpenses = monthExpenses[1]
    })
  }

  getTotalYearExpenses() {

    this.currentYearExpenses$ = this.store.pipe(select(currentYearExpensesSelector))
    this.expensesYearSubscription$ = this.currentYearExpenses$.subscribe((monthExpenses) => {
      this.yearExpensses = []
      this.barCharLabels = []
      monthExpenses.forEach((expenses: any) => {

        this.barCharLabels.push(expenses[0])
        this.yearExpensses.push(expenses[1])
        this.totalYearExpenses = this.yearExpensses.reduce((a, b) => a + b, 0)
        this.barChar = {
          labels: this.barCharLabels,
          datasets: [
            {data: this.yearExpensses, label: `${this.currentYear}`}

          ]
        }
      })

    })
  }

  getYearExpenses() {
    this.store.dispatch(getLatestAccountMovementsAction({activeAccount: this.activeAccount}))
    this.title = "Egresos del año"
    this.expensesAccountMovements$ = this.store.pipe(select(latestAccountMovementsSelector), map((movements) => {
      return movements.filter((movement) => {
        return movement.type == 'PAYMENT' || movement.type == 'TRANSFER_OUT'
      })
    }))
  }

}