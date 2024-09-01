import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CardTodoComponent } from './components/card-todo/card-todo.component';
import { StatoTodoPipe } from './pipes/stato-todo.pipe';
import { TodosComponent } from './routes/todos/todos.component';
import { ModalTodoComponent } from './components/modal-todo/modal-todo.component';
import { FormTodoComponent } from './components/form-todo/form-todo.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [

    // pagina base
    HomePage,

    // sotto pagine
    TodosComponent,

    // componenti
    CardTodoComponent,
    ModalTodoComponent,
    FormTodoComponent,

    // pipes
    StatoTodoPipe,
  ]
})
export class HomePageModule { }
