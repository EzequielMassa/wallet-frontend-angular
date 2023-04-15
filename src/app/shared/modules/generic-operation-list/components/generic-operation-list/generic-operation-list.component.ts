import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OperationInterface} from "../../../../types/operation.interface";
import {Observable, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'wal-generic-operation-list',
  templateUrl: './generic-operation-list.component.html',
  styleUrls: ['./generic-operation-list.component.css']
})
export class GenericOperationListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['movementsId', 'amount', 'description', 'date', 'type'];
  dataSource!: MatTableDataSource<OperationInterface>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input('title') titleProps!: string;
  @Input('operations') operationsProps!: Observable<OperationInterface[]>;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.operationsProps.subscribe((operations: OperationInterface[]) => {
      this.dataSource = this.dataSource = new MatTableDataSource(operations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
