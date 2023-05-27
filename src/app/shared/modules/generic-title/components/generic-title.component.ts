import {Component, Input} from '@angular/core';

@Component({
  selector: 'wal-generic-title',
  templateUrl: './generic-title.component.html',
  styleUrls: ['./generic-title.component.css']
})
export class GenericTitleComponent {
@Input("title") titleProps!: string | undefined;
}
