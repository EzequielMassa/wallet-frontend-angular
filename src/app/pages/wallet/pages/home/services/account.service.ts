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

  getUserAccounts(): Observable<UserAccountInterface[]> {
    const id: number = this.persistanceService.get('userId')
    const url: string = environment.apiUrl + `/api/v1/accounts/getAccounts/id/${id}`;
    return this.http.get<UserAccountInterface[]>(url);
  }


}
