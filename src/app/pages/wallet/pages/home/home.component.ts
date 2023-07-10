import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { ChartData } from 'chart.js';
import moment from 'moment';
import { AnimationOptions } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AccountService } from 'src/app/pages/wallet/pages/home/services/account.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { NewAccountBadgeService } from '../../../../shared/services/new-account-badge.service';
import { BarCharDataInterface } from '../../../../shared/types/barCharData.interface';
import { CurrentUserInterface } from '../../../../shared/types/currentUser.interface';
import { OperationInterface } from '../../../../shared/types/operation.interface';
import { currentUserSelector } from '../auth/store/selectors/auth.selector';
import {
  getCurrentMonthExpensesAction,
  getCurrentYearExpensesAction,
} from '../expenses/store/actions/expenses.action';
import { currentMonthExpensesSelector } from '../expenses/store/selectors/expenses.selectors';
import {
  getCurrentMonthIncomingsAction,
  getCurrentYearIncomingsAction,
} from '../incomings/store/actions/incomings.action';
import { currentMonthIncomingsSelector } from '../incomings/store/selectors/incomings.selectors';
import {
  getLatestAccountMovementsAction,
  getUserAccountsAction,
} from './store/actions/accounts.action';
import {
  isLoadingSelector,
  latestAccountMovementsSelector,
  userAccountsSelector,
} from './store/selectors/home.selectors';
import { UserAccountInterface } from './types/userAccount.interface';

@Component({
  selector: 'wal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOnEnterAnimation()],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser$!: Observable<CurrentUserInterface | null>;
  saludo!: string;
  options!: AnimationOptions;
  userAccounts$!: Observable<UserAccountInterface[]>;
  activeAccount!: number;
  activeAccountSubscription$!: Subscription;
  isLoading$!: Observable<boolean>;
  title: string = 'Latest movements';
  latestAccountMovements$!: Observable<OperationInterface[]>;
  barCharLabels!: string[];
  barCharDataIncomings!: BarCharDataInterface;
  barCharDataExpenses!: BarCharDataInterface;
  barChar!: ChartData<'bar'>;
  currentMonthIncomings$!: Observable<any>;
  currentMonthExpenses$!: Observable<any>;
  currentUserSubscription$!: Subscription;
  incomingSubscription$!: Subscription;
  expensesSubscription$!: Subscription;
  badgeSubscription$!: Subscription;
  badgeAction$!: boolean;

  slideConfig = {
    dots: true,
    centerMode: true,
    slidesToShow: 1,
    variableWidth: true,
    swipeToSlide: true,
    arrows: true,
    prevArrow: '.prev-arrow',
    nextArrow: '.next-arrow',

    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  };

  constructor(
    private accountService: AccountService,
    private store: Store,
    private persistanceService: PersistanceService,
    private toastr: ToastrService,
    private badgeService: NewAccountBadgeService
  ) {
    this.accountService
      .getUserAccounts()
      .subscribe((userAccounts: UserAccountInterface[]) => {
        if (this.persistanceService.get('activeAccount') == 0) {
          this.persistanceService.set(
            'activeAccount',
            userAccounts[0].accountId
          );
        }
        this.activeAccount = this.persistanceService.get('activeAccount');
        this.setActive(this.activeAccount);
        this.store.dispatch(getCurrentMonthIncomingsAction());
        this.store.dispatch(getCurrentMonthExpensesAction());
      });
  }

  initializeValues(): void {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.saludar();
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.userAccounts$ = this.store.pipe(select(userAccountsSelector));
    this.latestAccountMovements$ = this.store.pipe(
      select(latestAccountMovementsSelector)
    );
    this.currentMonthIncomings$ = this.store.pipe(
      select(currentMonthIncomingsSelector)
    );
    this.currentMonthExpenses$ = this.store.pipe(
      select(currentMonthExpensesSelector)
    );
    this.incomingSubscription$ = this.currentMonthIncomings$.subscribe(
      (monthIncomings) => {
        this.barCharLabels = [monthIncomings[0]];
        this.barCharDataIncomings = {
          data: [monthIncomings[1]],
          label: 'Incomings',
          backgroundColor: ['rgba(103, 58, 183, 0.7)'],
        };
      }
    );
    this.expensesSubscription$ = this.currentMonthExpenses$.subscribe(
      (monthExpenses) => {
        this.barCharDataExpenses = {
          data: [monthExpenses[1]],
          label: 'Expenses',
          backgroundColor: ['rgba(255, 44, 125, 0.7)'],
        };
        this.barChar = {
          labels: this.barCharLabels,
          datasets: [this.barCharDataIncomings, this.barCharDataExpenses],
        };
      }
    );
    this.badgeSubscription$ = this.badgeService.badgeState
      .pipe()
      .subscribe((data) => {
        this.badgeAction$ = data;
      });
  }

  saludar(): void {
    const [day, hour, am_pm] = moment().format('dddd,h,A').split(',');

    this.currentUserSubscription$ = this.currentUser$
      .pipe()
      .subscribe((user: CurrentUserInterface | null) => {
        if (am_pm === 'AM' && parseInt(hour) > 6 && parseInt(hour) < 12) {
          this.saludo = `Good morning ${user?.firstname}`;
          this.options = {
            path: '/assets/lottie/lottie-dia-icono.json',
          };
        } else {
          if (am_pm === 'PM' && (parseInt(hour) >= 12 || parseInt(hour) < 6)) {
            this.saludo = `Good afternoon ${user?.firstname}`;
            this.options = {
              path: '/assets/lottie/lottie-tarde-icono.json',
            };
          } else {
            this.saludo = `Good night ${user?.firstname}`;
            this.options = {
              path: '/assets/lottie/lottie-noche-icono.json',
            };
          }
        }
      });
  }

  setActive(accountId: number) {
    this.activeAccount = accountId;
    this.persistanceService.set('activeAccount', accountId);
    this.showSuccessActive();
    this.store.dispatch(
      getLatestAccountMovementsAction({ activeAccount: this.activeAccount })
    );
    this.store.dispatch(getCurrentMonthIncomingsAction());
    this.store.dispatch(getCurrentYearIncomingsAction());
    this.store.dispatch(getCurrentMonthExpensesAction());
    this.store.dispatch(getCurrentYearExpensesAction());
  }
  showSuccessActive() {
    this.toastr.info('', `Active account:  Nº${this.activeAccount}`);
  }

  hideBadge(): void {
    this.badgeService.setbadgeState(true);
  }
  ngOnInit(): void {
    this.store.dispatch(getUserAccountsAction());
    this.initializeValues();
  }

  ngOnDestroy(): void {
    this.incomingSubscription$.unsubscribe();
    this.expensesSubscription$.unsubscribe();
    this.currentUserSubscription$.unsubscribe();
    this.badgeSubscription$.unsubscribe();
  }
}
