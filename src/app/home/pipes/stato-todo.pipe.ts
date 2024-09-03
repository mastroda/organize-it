import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { DalService } from 'src/app/dal.service';
import { Store } from 'src/app/state';

/**
 * @param value id dello stato
 * 
 * @param field: 'descrizione'|'colore'. Default 'descrizione'
 * 
 * @returns descrizione o colore dello stato. Observable<string>
 * 
 * @example 
 * {{1 | statoTodo | async}}
 * {{1 | statoTodo : 'colore' | async}}
 */
@Pipe({
  name: 'statoTodo'
})
export class StatoTodoPipe implements PipeTransform {

  constructor(
    private dal: DalService,
  ) { }


  transform(value: number, field: 'descrizione' | 'colore' = 'descrizione'): Observable<string> {
    if (!value) {
      return of('Stato non specificato');
    }
    return this.dal.statiToDo$.pipe(map(stati => {
      if (!stati) { return 'Stati non trovati'; }
      const s = stati.find(c => c.id === value);
      switch (field) {
        case 'colore':
          return s?.colore || 'Stato non trovato';
        default:
          return s?.descrizione || 'Stato non trovato';
      }
    }));
  }
}
