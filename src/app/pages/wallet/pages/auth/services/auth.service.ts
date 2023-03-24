import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequestInterface} from "../types/registerRequest.interface";
import {map, Observable} from "rxjs";
import {CurrentUserInterface} from "../../../../../shared/types/currentUser.interface";
import {environment} from "../../../../../../environments/environment";
import {LoginRequestInterface} from "../types/loginRequest.interface";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/v1/auth/register';
    return this.http.post<CurrentUserInterface>(url, data).pipe(
      map((response: CurrentUserInterface) => response))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/v1/auth/authenticate';
    return this.http.post<CurrentUserInterface>(url, data).pipe(
      map((response: CurrentUserInterface) => response))
  }
}
