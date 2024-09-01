import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { DalService } from 'src/app/dal.service';
import { Store } from 'src/app/state';

@Pipe({
  name: 'statoTodo'
})
export class StatoTodoPipe implements PipeTransform {

  constructor(
    private dal: DalService,
  ) { }


  transform(value: number, ...args: unknown[]): Observable<string> {
    if (!value) {
      return of('Stato non specificato');
    }
    return this.dal.statiToDo$.pipe(map(stati => {
      if (!stati) { return 'Stati non trovati'; }
      const s = stati.find(c => c.id === value);
      if (args && args.length > 0) {
        if (args[0] === 'colore') {
          return s?.colore || 'Stato non trovato';
        }
      }

      return s?.descrizione || 'Stato non trovato';
    }));
  }
}
