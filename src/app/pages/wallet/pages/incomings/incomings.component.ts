import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../home/services/account.service";
import {select, Store} from "@ngrx/store";
import {
  getCurrentMonthIncomingsAction,
  getCurrentYearIncomingsAction,
  getLatestAccountMovementsAction
} from "../home/store/actions/accounts.action";
import {PersistanceService} from "../../../../shared/services/persistance.service";
import {map, Observable, Subscription} from "rxjs";
import {
  currentMonthIncomingsSelector,
  currentYearIncomingsSelector,
  latestAccountMovementsSelector
} from "../home/store/selectors/home.selectors";
import {OperationInterface} from "../../../../shared/types/operation.interface";
import {ChartData} from "chart.js";
import * as moment from "moment";

@Component({
  selector: 'wal-incomings',
  templateUrl: './incomings.component.html',
  styleUrls: ['./incomings.component.css']
})
export class IncomingsComponent implements OnInit, OnDestroy {
  totalMonthIncoming!: number;
  YearIncomings: number[] = [];
  totalYearIncomings!: number;
  private activeAccount!: number;
  currentMonthIncomings$!: Observable<any>;
  currentYearIncomings$!: Observable<any>;
  incomingMonthSubscription$!: Subscription;
  incomingYearSubscription$!: Subscription;
  title!: string;
  IncomingsAccountMovements$!: Observable<OperationInterface[]>;
  barChar!: ChartData<'bar'>
  barCharLabels: string[] = [];
  currentYear: number = moment().get('year')

  constructor(private accountService: AccountService, private store: Store, private persistanceService: PersistanceService) {
    this.store.dispatch(getCurrentMonthIncomingsAction())
    this.store.dispatch(getCurrentYearIncomingsAction())
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  ngOnDestroy(): void {
  }


  initializeValues() {
    this.activeAccount = this.persistanceService.get('activeAccount')
    this.getTotalMonthIncomings()
    this.getTotalYearIncomings()
    this.getYearIncomings()

  }

  getTotalMonthIncomings() {
    this.currentMonthIncomings$ = this.store.pipe(select(currentMonthIncomingsSelector))
    this.incomingMonthSubscription$ = this.currentMonthIncomings$.subscribe((monthIncomings) => {
      this.totalMonthIncoming = monthIncomings[1]
    })
  }

  getTotalYearIncomings() {

    this.currentYearIncomings$ = this.store.pipe(select(currentYearIncomingsSelector))
    this.incomingYearSubscription$ = this.currentYearIncomings$.subscribe((monthIncomings) => {
      this.YearIncomings = []
      this.barCharLabels = []
      monthIncomings.forEach((incomings: any) => {

        this.barCharLabels.push(incomings[0])
        this.YearIncomings.push(incomings[1])
        this.totalYearIncomings = this.YearIncomings.reduce((a, b) => a + b, 0)
        this.barChar = {
          labels: this.barCharLabels,
          datasets: [
            {data: this.YearIncomings, label: `${this.currentYear}`, backgroundColor: ["rgba(103, 58, 183, 0.7)"]}

          ]
        }
      })

    })
  }

  getYearIncomings() {
    this.store.dispatch(getLatestAccountMovementsAction({activeAccount: this.activeAccount}))
    this.title = "Ingresos del año"
    this.IncomingsAccountMovements$ = this.store.pipe(select(latestAccountMovementsSelector), map((movements) => {
      return movements.filter((movement) => {
        return movement.type == 'DEPOSIT' || movement.type == 'TRANSFER_IN'
      })
    }))
  }

}
