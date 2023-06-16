import {Component, OnDestroy, OnInit} from "@angular/core";
import {map, Observable, Subscription} from "rxjs";
import {OperationInterface} from "../../../../shared/types/operation.interface";
import {ChartData} from "chart.js";
import * as moment from "moment";
import {select, Store} from "@ngrx/store";
import {PersistanceService} from "../../../../shared/services/persistance.service";
import {currentMonthIncomingsSelector, currentYearIncomingsSelector} from "./store/selectors/incomings.selectors";
import {getCurrentMonthIncomingsAction, getCurrentYearIncomingsAction} from "./store/actions/incomings.action";
import {getLatestAccountMovementsAction} from "../home/store/actions/accounts.action";
import {latestAccountMovementsSelector} from "../home/store/selectors/home.selectors";
import {fadeInOnEnterAnimation} from "angular-animations";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'wal-incomings',
  templateUrl: './incomings.component.html',
  styleUrls: ['./incomings.component.css'],
  animations: [fadeInOnEnterAnimation()]
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

  constructor( private store: Store, private persistanceService: PersistanceService, private toastr: ToastrService) {
    this.store.dispatch(getCurrentMonthIncomingsAction())
    this.store.dispatch(getCurrentYearIncomingsAction())
  }

  ngOnInit(): void {
    this.initializeValues()
    this.showSuccessActive()
  }

  ngOnDestroy(): void {
    this.incomingMonthSubscription$.unsubscribe();
    this.incomingYearSubscription$.unsubscribe()
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
    this.title = "Year incomings"
    this.IncomingsAccountMovements$ = this.store.pipe(select(latestAccountMovementsSelector), map((movements) => {
      return movements.filter((movement) => {
        return movement.type == 'DEPOSIT' || movement.type == 'TRANSFER_IN'
      })
    }))
  }
  showSuccessActive() {
    this.toastr.info('', `Active account:  Nº${this.activeAccount}`);
  }
}
