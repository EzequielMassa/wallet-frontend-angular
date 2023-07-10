import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PersistanceService} from "../../../../../shared/services/persistance.service";
import {Observable} from "rxjs";

import {environment} from "../../../../../../environments/environment.development";
import moment from "moment";

@Injectable({
  providedIn: 'root',
})
export class IncomingsService {
  constructor(private http: HttpClient, private persistanceService: PersistanceService) {
  }

  getAccountIncomingsByMonthAndYear(): Observable<any> {
    const activeAccount: number = this.persistanceService.get('activeAccount')
    const currentMonth: number = moment().get("month") + 1
    const currentYear: number = moment().get("year")
    const url: string = environment.apiUrl + `/api/v1/movements/incomings/id/${activeAccount}/month/${currentMonth}/year/${currentYear}`;
    return this.http.get<any>(url);
  }
  getAccountIncomingsByYear(): Observable<any> {
    const activeAccount: number = this.persistanceService.get('activeAccount')
    const currentYear: number = moment().get("year")
    const url: string = environment.apiUrl + `/api/v1/movements/incomings/id/${activeAccount}/year/${currentYear}`;
    return this.http.get<any>(url);
  }
}
