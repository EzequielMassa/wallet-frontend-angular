import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from "../../../../../../environments/environment.development";
import {UserAccountInterface} from "../types/userAccount.interface";
import {PersistanceService} from "../../../../../shared/services/persistance.service";
import {DepositPaymentInterface} from "../types/DepositPayment.interface";
import {TransferInterface} from "../types/Transfer.interface";
import {OperationInterface} from "../../../../../shared/types/operation.interface";
import * as moment from "moment/moment";
import {RegisterRequestInterface} from "../../auth/types/registerRequest.interface";
import {CurrentUserInterface} from "../../../../../shared/types/currentUser.interface";

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private persistanceService: PersistanceService) {
  }

  private id: number = this.persistanceService.get('userId')

  getUserAccounts(): Observable<UserAccountInterface[]> {
    const url: string = environment.apiUrl + `/api/v1/accounts/getAccounts/id/${this.id}`;
    return this.http.get<UserAccountInterface[]>(url);
  }

  createNewUserAccount(): Observable<UserAccountInterface> {
    const url: string = environment.apiUrl + `/api/v1/accounts/newAccount/${this.id}`;
    return this.http.post<UserAccountInterface>(url, {})
  }

  createDepositPayment(depositPayment: DepositPaymentInterface): Observable<any> {
    const idAcc = depositPayment.accountId
    const transactionType = depositPayment.type
    let urlDynamic: string;


    if (transactionType == 'deposit') {
      urlDynamic = environment.apiUrl + `/api/v1/deposits/newDeposit/${idAcc}`;
    } else {
      urlDynamic = environment.apiUrl + `/api/v1/payments/newPayment/${idAcc}`;
    }
    const depPayRequest = {
      'amount': depositPayment.amount,
      'description': depositPayment.description
    }
    return this.http.post<any>(urlDynamic, depPayRequest)
  }


  createTransfer(transfer: TransferInterface): Observable<any> {
    const idAcc = transfer.accountId
    const idDestiny = transfer.destinyAccount


    const url = environment.apiUrl + `/api/v1/transfers/newTransfer/origin/${idAcc}/destiny/${idDestiny}`;

    const transRequest = {
      'amount': transfer.amount,
      'description': transfer.description
    }
    return this.http.post<any>(url, transRequest)
  }

  getLatestAccountMovements(activeAccount: number): Observable<OperationInterface[]> {
    const url: string = environment.apiUrl + `/api/v1/movements/id/${activeAccount}`;
    return this.http.get<OperationInterface[]>(url);
  }

  getAccountIncomingsByMonthAndYear(): Observable<any> {
    const activeAccount: number = this.persistanceService.get('activeAccount')
    const currentMonth: number = moment().get("month") + 1
    const currentYear: number = moment().get("year")
    const url: string = environment.apiUrl + `/api/v1/movements/incomings/id/${activeAccount}/month/${currentMonth}/year/${currentYear}`;
    return this.http.get<any>(url);
  }

  getAccountExpensesByMonthAndYear(): Observable<any> {
    const activeAccount: number = this.persistanceService.get('activeAccount')
    const currentMonth: number = moment().get("month") + 1
    const currentYear: number = moment().get("year")
    const url: string = environment.apiUrl + `/api/v1/movements/expenses/id/${activeAccount}/month/${currentMonth}/year/${currentYear}`;
    return this.http.get<any>(url);
  }



  getAccountExpensesByYear(): Observable<any> {
    const activeAccount: number = this.persistanceService.get('activeAccount')
    const currentYear: number = moment().get("year")
    const url: string = environment.apiUrl + `/api/v1/movements/expenses/id/${activeAccount}/year/${currentYear}`;
    return this.http.get<any>(url);
  }

  updateProfile(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/v1/user/update';
    return this.http
      .put<CurrentUserInterface>(url, data).pipe(map((response: CurrentUserInterface) => response));
  }
}

