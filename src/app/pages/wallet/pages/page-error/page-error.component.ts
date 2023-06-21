import { Component } from '@angular/core';
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'wal-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.css']
})
export class PageErrorComponent {
  options: AnimationOptions = {
    path: '/assets/lottie/lottie-not-found.json',
  };
}
