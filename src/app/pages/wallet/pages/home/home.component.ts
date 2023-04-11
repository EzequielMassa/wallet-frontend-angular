import {Component, OnInit} from '@angular/core';
import {AccountService} from 'src/app/pages/wallet/pages/home/services/account.service';
import {UserAccountInterface} from "./types/userAccount.interface";
import {Observable} from "rxjs";
import {select, Store} from '@ngrx/store';
import {getUserAccountsAction} from "./store/actions/accounts.action";
import {isLoadingSelector, userAccountsSelector} from "./store/selectors/home.selectors";

@Component({
  selector: 'wal-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  userAccounts$!: Observable<UserAccountInterface[]>;
  isLoading$!: Observable<boolean>;

  slideConfig = {
    centerMode: true,
    centerPadding: '70px',
    slidesToShow: 3,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          slidesToShow: 1
        }
      }
    ]
  }

  constructor(private accountService: AccountService, private store: Store) {
  }

  ngOnInit(): void {

    this.store.dispatch(getUserAccountsAction())

    this.initializeValues()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.userAccounts$ = this.store.pipe(select(userAccountsSelector))
  }

}
