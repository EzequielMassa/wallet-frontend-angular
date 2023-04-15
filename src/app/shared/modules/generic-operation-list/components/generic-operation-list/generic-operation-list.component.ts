import {AfterViewInit, Component, Input} from '@angular/core';
import {OperationInterface} from "../../../../types/operation.interface";
import {Observable} from "rxjs";


@Component({
  selector: 'wal-generic-operation-list',
  templateUrl: './generic-operation-list.component.html',
  styleUrls: ['./generic-operation-list.component.css']
})
export class GenericOperationListComponent implements AfterViewInit {

  @Input('title') titleProps!: string;
  @Input('operations') operationsProps!: Observable<OperationInterface[]>;

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: OperationInterface) => `${element.movementsId}`,
    },
    {
      columnDef: 'amount',
      header: 'Amount',
      cell: (element: OperationInterface) => `${element.amount}`,
    },
    {
      columnDef: 'description',
      header: 'Description',
      cell: (element: OperationInterface) => `${element.description}`,
    },
    {
      columnDef: 'date',
      header: 'Date',
      cell: (element: OperationInterface) => `${element.date}`,
    },
  ];

  constructor() {
  }

  ngAfterViewInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    filterValue.trim().toLowerCase();
  }

  displayedColumns = this.columns.map(c => c.columnDef);
}
