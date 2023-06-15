import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

const badgeState = true;
@Injectable({
  providedIn: 'root'
})
export class NewAccountBadgeService {
  private badgeState$ = new BehaviorSubject<boolean>(badgeState);
  constructor() { }

  get badgeState(): Observable<boolean> {
    return this.badgeState$.asObservable();
  }

  setbadgeState(newData: boolean): void {
    this.badgeState$.next(newData)
  }
}
