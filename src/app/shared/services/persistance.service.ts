import {Injectable} from "@angular/core";

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
    try {
      const keyResult: any = localStorage.getItem(key);
      return JSON.parse(keyResult)
    } catch (error) {
      console.error('error getting from local storage ', error);
      return null;
    }
  }
}
