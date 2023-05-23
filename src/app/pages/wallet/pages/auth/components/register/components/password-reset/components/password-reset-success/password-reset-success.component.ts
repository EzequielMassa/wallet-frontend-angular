import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BackendMessagesInterface} from "../../../../../../../../../../shared/types/backendMessages.interface";
import {select, Store} from "@ngrx/store";
import {backendMessagesSelector} from "../../../../../../store/selectors/auth.selector";
import {Router} from "@angular/router";

@Component({
  selector: 'wal-password-reset-success',
  templateUrl: './password-reset-success.component.html',
  styleUrls: ['./password-reset-success.component.css']
})
export class PasswordResetSuccessComponent implements OnInit{
  backendMessages$!:Observable<BackendMessagesInterface | null>;

  constructor(private store:Store,private router:Router) {
  }
  ngOnInit(): void {
    this.backendMessages$ = this.store.pipe(select(backendMessagesSelector))
  }
  navigate(){
    this.router.navigate(['/auth/login'])
  }
}
