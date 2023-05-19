import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PersistanceService} from "../../../../../shared/services/persistance.service";
import {Observable} from "rxjs";
import * as moment from "moment";
import {environment} from "../../../../../../environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class IncomingsService {
  constructor(private http: HttpClient, private persistanceService: PersistanceService) {
  }

  getAccountIncomingsByYear(): Observable<any> {
    const activeAccount: number = this.persistanceService.get('activeAccount')
    const currentYear: number = moment().get("year")
    const url: string = environment.apiUrl + `/api/v1/movements/incomings/id/${activeAccount}/year/${currentYear}`;
    return this.http.get<any>(url);
  }
}
