import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { StatoToDo, ToDo } from './models';


/**
 * Struttura dello stato dell'applicazione
 */
export interface State {
    /**
     * Definisce l'attesa minima di ogni chiamata effettuata alle chiamate REST
     * @default 1500ms
     */
    fakeDelay: number;

    /**
     * Lista degli stati dei ToDo
     */
    stati: StatoToDo[];
    /**
     * Lista delle ToDo
     */
    todos: ToDo[];
    /**
     * Specifica se la lista delle todo è stata caricata
     */
    todosCaricate: boolean;
}

const statoIniziale: State = {
    fakeDelay: 1500,

    stati: [
        { id: 1, descrizione: 'In attesa' },
        { id: 2, descrizione: 'In progresso' },
        { id: 3, descrizione: 'Completato' },
    ],
    todos: [],
    todosCaricate: false,
};

@Injectable({
    providedIn: 'root'
})
/**
 * Classe di gestione dello stato dell'applicazione
 */
export class Store {

    /**
     * Contiene lo stato aggiornato dell'applicazione
     */
    private subject = new BehaviorSubject<State>(statoIniziale);

    /**
     * Contiene la stato aggiornato dell'applicazione sotto forma di Observable.
     * Emette il cambio di stato solamente quando il valore di `subject` cambia
     */
    private store = this.subject.asObservable().pipe(distinctUntilChanged());

    /**
     * Ritorna il valore corrente dello stato dell'applicazione
     */
    get value() {
        return this.subject.value;
    }

    /**
     * Modifica il valore di un membro dello stato dell'applicazione
     * @param name nome del membro dello stato da modificare
     * @param state nuovo valore
     */
    private set(name: string, state: any) {
        this.subject.next({
            ...this.value,
            [name]: state
        });
    }

    getFakeDelay() {
        return this.store.pipe(map(s => s?.fakeDelay));
    }
    setFakeDelay(value: number): void {
        this.set('fakeDelay', value);
    }


    getStatiToDo() {
        return this.store.pipe(map(s => s?.stati));
    }

    getTodosCaricate() {
        return this.store.pipe(map(s => s?.todosCaricate));
    }
    setTodosCaricate(value: boolean): void {
        this.set('todosCaricate', value);
    }

    getToDos() {
        return this.store.pipe(map(s => s?.todos));
    }
    setToDos(value: ToDo[]): void {
        this.set('todos', value);
    }
}
