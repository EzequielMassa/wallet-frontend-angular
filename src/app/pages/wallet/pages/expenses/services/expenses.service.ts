import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PersistanceService} from "../../../../../shared/services/persistance.service";
import {Observable} from "rxjs";
import * as moment from "moment";
import {environment} from "../../../../../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private http: HttpClient, private persistanceService: PersistanceService) {
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

}
