import { Component, OnInit } from '@angular/core';
import { lastValueFrom, map, merge, mergeMap } from 'rxjs';
import { DalService } from 'src/app/dal.service';
import { StatoToDo, ToDo } from 'src/app/models';
import { UtilsService } from 'src/app/utils.service';
import { ModalTodoComponent } from '../../components/modal-todo/modal-todo.component';
import { fadeAnimation } from 'src/app/animations';

/**
 * Subroute per la visualizzazione e gestione delle ToDo
 */

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [fadeAnimation]
})
export class TodosComponent implements OnInit {

  ricerca: string = '';
  idStato: number = 0;

  ordinamenti = ['creazione', 'titolo', 'descrizione'];

  ordinamentoSelezionato: string = 'creazione';

  /** 
   * lista degli stati todo
  */
  get stati$() {
    return this.dal.statiToDo$;
  }


  /**
   * lista delle todo filtrate per `ricerca` e ordinate per `ordinamentoSelezionato`
  */
  get todos$() {
    return this.dal.todos$.pipe(map(
      todos => {
        if (!todos) {
          return [];
        }
        return todos
          .filter(t => [t.titolo, t.descrizione].join('|').toLowerCase().includes(this.ricerca.toLowerCase()))
          ?.sort((a, b) => {
            switch (this.ordinamentoSelezionato) {
              case 'creazione':
                return a.dataCreazione > b.dataCreazione ? 1 : (a.dataCreazione === b.dataCreazione ? 0 : -1);
              case 'descrizione':
                return a.descrizione > b.descrizione ? 1 : (a.descrizione === b.descrizione ? 0 : -1);
              case 'titolo':
                return a.titolo > b.titolo ? 1 : (a.titolo === b.titolo ? 0 : -1);
              default:
                return 1;
            }
          });
      }
    ));
  }

  get isLoading$() {
    return this.dal.isLoadingTodos$;
  }

  /**
   * lista degli stati filtrati in base a `idStato` con aggiunta della lista delle todo con il relativo stato
  */
  get todosByStato$() {
    return this.dal.statiToDo$.pipe(
      map(stati => {
        if (!stati) {
          return [];
        }
        if (this.idStato > 0) {
          return stati.filter(s => s.id === this.idStato);
        }
        return stati;
      }),
      mergeMap(stati => {
        return this.todos$.pipe(map(
          todos => {
            if (!stati) {
              return [];
            }
            return stati.map(s => ({
              ...s,
              todos: todos ? todos.filter(t => t.idStato === s.id) : []
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


  /**
   * Apre il modal ToDo per l'inserimento di un nuovo record o per vederne il dettaglio
   */
  async apri(toDo: ToDo | undefined) {
    if (!toDo) {
      toDo = {
        descrizione: '',
        id: '',
        idStato: 1,
        titolo: '',
        dataCreazione: new Date(),

        campiAggiuntivi: [],
      };
    }
    await this.utils.apriModal({
      component: ModalTodoComponent,
      componentProps: {
        toDo: toDo
      }
    });
  }


  /**
   * Apre il modal ToDo per l'inserimento di un nuovo record con lo stato già impostato
   */
  nuovaDaStato(stato: StatoToDo) {
    const nuova: ToDo = {
      descrizione: '',
      id: '',
      idStato: stato.id,
      titolo: '',
      dataCreazione: new Date(),

      campiAggiuntivi: [],
    };

    this.apri(nuova);
  }
}
