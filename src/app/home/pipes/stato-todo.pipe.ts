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
      return stati.find(c => c.id === value)?.descrizione || 'Stato non trovato';
    }));
  }
}
