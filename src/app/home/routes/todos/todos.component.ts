import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { DalService } from 'src/app/dal.service';
import { ToDo } from 'src/app/models';
import { UtilsService } from 'src/app/utils.service';
import { ModalTodoComponent } from '../../components/modal-todo/modal-todo.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {

  get todos$() {
    return this.dal.todos$;
  }

  get isLoading$() {
    return this.dal.isLoadingTodos$;
  }

  constructor(
    public dal: DalService,
    public utils: UtilsService,
  ) { }

  ngOnInit() { }



  async aggiungi() {
    const nuova: ToDo = {
      descrizione: '',
      id: '',
      idStato: 1,
      titolo: '',
      dataCreazione: new Date(),
    };

    await this.utils.apriModal({
      component: ModalTodoComponent,
      componentProps: {
        toDo: nuova
      }
    });
  }
}
