import { Component, OnInit } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { DalService } from 'src/app/dal.service';

/**
 * Subroute per la visualizzazione di alcune statistiche relative alle ToDo
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {


  get todosXstato$() {
    return this.dal.statiToDo$.pipe(
      mergeMap(stati => {
        return this.dal.todos$.pipe(
          map(todos => {
            if (!stati) {
              return undefined;
            }

            return stati.map(s => {
              const todosStato = todos.filter(t => t.idStato === s.id);
              const quantita = todosStato?.length || 0;
              const percentuale = quantita > 0 && todos && todos.length > 0 ? quantita * 100 / todos.length : 0;
              const ultimaData = quantita > 0 ? todosStato.map(t => t.dataCreazione).reduce((a, b) => a > b ? a : b) : undefined;

              return {
                ...s,
                quantita,
                percentuale,
                ultimaData,
              }
            });
          })
        );
      })
    );
  }

  get isLoading$() {
    return this.dal.isLoadingTodos$;
  }

  constructor(
    private dal: DalService
  ) { }

  ngOnInit() { }

}
