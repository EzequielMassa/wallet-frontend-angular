import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GenericModalService} from "../../../deposit-payment-form/services/generic-modal.service";

@Component({
  selector: 'wal-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent {

  dialogTitle: string;


  constructor(public dialogRef: MatDialogRef<GenericModalComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    target: string
  }, private modalService: GenericModalService) {
    this.dialogTitle = this.data.target;
  }

  cancel(): void {
    this.dialogRef.close()
    this.modalService.setdata(false)
  }

  accept(): void {
    this.modalService.setdata(true)
  }
}
