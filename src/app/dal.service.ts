import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from './state';
import { catchError, delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { WEB_SERVICE_URL } from './costanti';
import { RisultatoOperazione, ToDo } from './models';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DalService {


  get statiToDo$() {
    return this.store.getStatiToDo();
  }

  get todos$() {
    return this.store.getToDos();
  }




  /**
   * Header condivisi per tutte le chiamate http
   */
  private defaultHeaders = {
    headers: new HttpHeaders({
      // default headers
      // Token: ''
    }),
  }

  constructor(
    private http: HttpClient,
    private store: Store,
    private utils: UtilsService,
  ) { }


  /**
   * Effettua la chiamata http get su basato su `WEB_SERVICE_URL`
   * @param funzione sezione della url da concatenare a `WEB_SERVICE_URL`
   * @returns Ritorna un'istanza di `RisultatoOperazione`
   */
  private get<T>(funzione: string): Observable<RisultatoOperazione<T>> {
    return this.http.get(WEB_SERVICE_URL + funzione, this.defaultHeaders).pipe(
      delay(this.store.value.fakeDelay),
      switchMap(r => of({ errore: '', isOk: true, data: r } as RisultatoOperazione<T>)),
      catchError(e => of({ errore: e.message as string, isOk: false, data: undefined } as RisultatoOperazione<T>)),
    );
  }

  /**
   * Effettua la chiamata http get su basato su `WEB_SERVICE_URL`
   * @param funzione sezione della url da concatenare a `WEB_SERVICE_URL`
   * @returns Ritorna un'istanza di `RisultatoOperazione`
   */
  private post<T>(funzione: string, payload: any): Observable<RisultatoOperazione<T>> {
    return this.http.post(WEB_SERVICE_URL + funzione, payload, this.defaultHeaders).pipe(
      delay(this.store.value.fakeDelay),
      switchMap(r => of({ errore: '', isOk: true, data: r } as RisultatoOperazione<T>)),
      catchError(e => of({ errore: e.message as string, isOk: false, data: undefined } as RisultatoOperazione<T>)),
    );
  }

  /**
   * Effettua la chiamata http get su basato su `WEB_SERVICE_URL`
   * @param funzione sezione della url da concatenare a `WEB_SERVICE_URL`
   * @returns Ritorna un'istanza di `RisultatoOperazione`
   */
  private put<T>(funzione: string, payload: any): Observable<RisultatoOperazione<T>> {
    return this.http.put(WEB_SERVICE_URL + funzione, payload, this.defaultHeaders).pipe(
      delay(this.store.value.fakeDelay),
      switchMap(r => of({ errore: '', isOk: true, data: r } as RisultatoOperazione<T>)),
      catchError(e => of({ errore: e.message as string, isOk: false, data: undefined } as RisultatoOperazione<T>)),
    );
  }

  /**
   * Effettua la chiamata http get su basato su `WEB_SERVICE_URL`
   * @param funzione sezione della url da concatenare a `WEB_SERVICE_URL`
   * @returns Ritorna un'istanza di `RisultatoOperazione`
   */
  private delete<T>(funzione: string): Observable<RisultatoOperazione<T>> {
    return this.http.delete(WEB_SERVICE_URL + funzione, this.defaultHeaders).pipe(
      delay(this.store.value.fakeDelay),
      switchMap(r => of({ errore: '', isOk: true, data: r } as RisultatoOperazione<T>)),
      catchError(e => of({ errore: e.message as string, isOk: false, data: undefined } as RisultatoOperazione<T>)),
    );
  }


  caricaToDos() {
    return this.get<ToDo[]>('todos').pipe(tap(
      res => {
        this.store.setToDo(res.data || []);
      }
    ));
  }

  salvaToDo(todo: ToDo) {
    if (todo.id) {
      return this.put<null>(`todos/${todo.id}`, todo);
    } else {
      todo.id = this.utils.getRandomString(6);
    }
    return this.post<null>('todos', todo);
  }

  eliminaToDo(id: string) {
    return this.delete<null>(`todos/${id}`);
  }
}
