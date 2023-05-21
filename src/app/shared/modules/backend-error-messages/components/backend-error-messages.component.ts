import {Component, Input, OnInit} from '@angular/core';
import {BackendErrorsInterface} from "../../../types/backendErrors.interface";

@Component({
  selector: 'wal-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.css']
})
export class BackendErrorMessagesComponent implements OnInit{
@Input("backendErrors") backendErrorsProps!: BackendErrorsInterface | null;
errorMessages!: string[]

  ngOnInit(): void {
    this.errorMessages = Object.keys((this.backendErrorsProps)!).map(
      (name: string) => {
        const messages = this.backendErrorsProps![name]
        return `${messages}`

      }
    )
  }
}
