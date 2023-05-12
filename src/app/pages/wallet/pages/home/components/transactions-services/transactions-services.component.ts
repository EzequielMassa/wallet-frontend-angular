import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  GenericModalComponent
} from "../../../../../../shared/modules/generic-modal/components/generic-modal/generic-modal.component";


@Component({
  selector: 'wal-transactions-services',
  templateUrl: './transactions-services.component.html',
  styleUrls: ['./transactions-services.component.css']
})
export class TransactionsServicesComponent {
  constructor(public dialog: MatDialog) {
  }


  openDialog(event: any): void {
    this.dialog.open(GenericModalComponent, {
      width: '80%',
      height: 'auto',
      data: {target: event.currentTarget.dataset.type},
    });
  }

}
