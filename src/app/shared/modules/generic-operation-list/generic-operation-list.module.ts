import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenericOperationListComponent} from './components/generic-operation-list/generic-operation-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    GenericOperationListComponent
  ],
  exports: [
    GenericOperationListComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule
  ]
})
export class GenericOperationListModule {
}
