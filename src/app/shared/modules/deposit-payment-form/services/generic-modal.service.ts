import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GenericModalService {

  private buttonAction$ = new Subject<boolean>;

  constructor() {
  }

  get data(): Observable<any> {
    return this.buttonAction$.asObservable();
  }

  setdata(newData: boolean): void {
    this.buttonAction$.next(newData)
  }
}
