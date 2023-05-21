import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { map, Observable } from 'rxjs';
import { CurrentUserInterface } from '../../../../../shared/types/currentUser.interface';
import { environment } from '../../../../../../environments/environment';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import {PasswordForgotRequestInterface} from "../types/passwordForgotRequest.interface";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/v1/auth/register';
    return this.http
      .post<CurrentUserInterface>(url, data)
      .pipe(map((response: CurrentUserInterface) => response));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/v1/auth/authenticate';
    return this.http
      .post<CurrentUserInterface>(url, data)
      .pipe(map((response: CurrentUserInterface) => response));
  }

  passwordForgot(data: PasswordForgotRequestInterface): Observable<any> {
    const url = environment.apiUrl + '/api/v1/auth/password-forgot';
    return this.http
      .post<any>(url, data).pipe(map((response: any) => response));
  }
  updateProfile(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/api/v1/user/update';
    return this.http
      .put<CurrentUserInterface>(url, data).pipe(map((response: CurrentUserInterface) => response));
  }
}
