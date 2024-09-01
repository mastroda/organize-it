import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { TodosComponent } from './routes/todos/todos.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { AboutComponent } from './routes/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', redirectTo: 'todos', pathMatch: 'full' },
      { path: 'todos', component: TodosComponent, },
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'about', component: AboutComponent, }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
