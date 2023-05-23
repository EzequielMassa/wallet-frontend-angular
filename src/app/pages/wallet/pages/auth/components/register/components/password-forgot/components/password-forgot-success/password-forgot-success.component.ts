import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BackendMessagesInterface} from "../../../../../../../../../../shared/types/backendMessages.interface";
import {select, Store} from "@ngrx/store";
import {backendMessagesSelector} from "../../../../../../store/selectors/auth.selector";

@Component({
  selector: 'wal-password-forgot-success',
  templateUrl: './password-forgot-success.component.html',
  styleUrls: ['./password-forgot-success.component.css']
})
export class PasswordForgotSuccessComponent implements OnInit{
  backendMessages$!:Observable<BackendMessagesInterface | null>;

  constructor(private store:Store) {
  }
  ngOnInit(): void {
    this.backendMessages$ = this.store.pipe(select(backendMessagesSelector))
  }
}
