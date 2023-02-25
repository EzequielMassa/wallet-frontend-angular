import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TodosRoutingModule } from 'src/app/pages/todos/todos/todos-routing.module';
import { TodosComponent } from './components/todos/todos.component';

@NgModule({
  imports: [
    CommonModule,
    TodosRoutingModule
  ],
  declarations: [
    TodosComponent
  ]
})
export class TodosModule { }
