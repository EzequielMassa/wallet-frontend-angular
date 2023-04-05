import {Injectable} from '@angular/core';

@Injectable()
export class PersistanceService {
  set(key: any, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('error saving to local storage ', error);
    }
  }

  get(key: any): any {
    let keyResult: any = localStorage.getItem(key);
    return JSON.parse(keyResult);
  }
}
