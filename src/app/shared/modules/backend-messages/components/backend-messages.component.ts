import {Component, Input, OnInit} from '@angular/core';
import {BackendMessagesInterface} from "../../../types/backendMessages.interface";

@Component({
  selector: 'wal-backend-messages',
  templateUrl: './backend-messages.component.html',
  styleUrls: ['./backend-messages.component.css']
})
export class BackendMessagesComponent implements OnInit{

  @Input("backendMessage") backendMessageProps!: BackendMessagesInterface | null;
  message!: string[];
  ngOnInit(): void {
    this.message = Object.keys((this.backendMessageProps)!).map(
      (name: string) => {
        const messages = this.backendMessageProps![name]
        return `${messages}`
      }
    )
  }

}
