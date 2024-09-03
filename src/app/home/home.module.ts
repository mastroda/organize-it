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
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { FormCampoAggiuntivoComponent } from './components/form-campo-aggiuntivo/form-campo-aggiuntivo.component';
import { CampoAggiuntivoComponent } from './components/campo-aggiuntivo/campo-aggiuntivo.component';


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
    DashboardComponent,

    // componenti
    CardTodoComponent,
    ModalTodoComponent,
    FormTodoComponent,
    FormCampoAggiuntivoComponent,
    CampoAggiuntivoComponent,

    // pipes
    StatoTodoPipe,
  ]
})
export class HomePageModule { }
