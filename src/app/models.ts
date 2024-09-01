export interface ToDo {
    id: string;
    titolo: string;
    descrizione: string;
    idStato: number;
    dataCreazione: Date;
}


export interface StatoToDo {
    id: number;
    descrizione: string;
    colore: string;
}


export interface RisultatoOperazione<T> {
    isOk: boolean;
    errore: string;
    data: T | undefined;
}