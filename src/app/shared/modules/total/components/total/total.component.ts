import {Component, Input} from '@angular/core';

@Component({
  selector: 'wal-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent {

  @Input('title') titleProps!: string;
  @Input('total') totalProps!: number;
  @Input('icon') iconProps!: string;

}
