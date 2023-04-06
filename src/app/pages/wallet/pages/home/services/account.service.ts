import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../../../../../environments/environment.development";
import {UserAccountInterface} from "../types/userAccount.interface";
import {PersistanceService} from "../../../../../shared/services/persistance.service";

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

}
