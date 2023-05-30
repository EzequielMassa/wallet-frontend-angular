import { Component } from '@angular/core';
import {SpinnerService} from "../services/spinner.service";
import {Subject} from "rxjs";
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'wal-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  isLoading$:Subject<boolean> = this.spinnerService.isLoading$;
  options: AnimationOptions = {
    path: '/assets/lottie/lottie-spinner.json',
  };
constructor(private spinnerService: SpinnerService) {
}
}
