import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../../../../../environments/environment.development";
import {UserAccountInterface} from "../types/userAccount.interface";
import {PersistanceService} from "../../../../../shared/services/persistance.service";
import {DepositPaymentInterface} from "../types/DepositPayment.interface";
import {TransferInterface} from "../types/Transfer.interface";
import {OperationInterface} from "../../../../../shared/types/operation.interface";
import {UsersDTOInterface} from "../types/usersDTO.interface";

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

  getAllUsers(): Observable<UsersDTOInterface[]> {
    const url: string = environment.apiUrl + `/api/v1/user/get-all`;
    return this.http.get<UsersDTOInterface[]>(url);
  }
}

