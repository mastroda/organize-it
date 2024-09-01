import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map, merge, mergeMap } from 'rxjs';
import { DalService } from 'src/app/dal.service';
import { ToDo } from 'src/app/models';
import { UtilsService } from 'src/app/utils.service';
import { ModalTodoComponent } from '../../components/modal-todo/modal-todo.component';
import { fadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [fadeAnimation]
})
export class TodosComponent implements OnInit {

  filtri: {} = {};


  get stati$() {
    return this.dal.statiToDo$;
  }

  get todos$() {
    return this.dal.todos$;
  }

  get isLoading$() {
    return this.dal.isLoadingTodos$;
  }

  get todosByStato$() {
    return this.dal.statiToDo$.pipe(
      mergeMap(stati => {
        return this.dal.todos$.pipe(map(
          todos => {
            if (!stati) {
              return [];
            }
            return stati.map(s => ({
              ...s,
              todos: todos.filter(t => t.idStato === s.id)
            }))
          }
        ));
      })
    );
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
