import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { TodosComponent } from './routes/todos/todos.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', redirectTo: 'todos', pathMatch: 'full' },
      { path: 'todos', component: TodosComponent, }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
