import { Component, Input, OnInit } from '@angular/core';
import { DalService } from 'src/app/dal.service';
import { CampoAggiuntivo, ToDo } from 'src/app/models';


/**
 * Form per la gestione di una ToDo
 * 
 * @param toDo: ToDo
 * @param readonly: boolean. Default false
 * 
 * @event eClick => ToDo
 */
@Component({
  selector: 'app-form-todo',
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.scss'],
})
export class FormTodoComponent implements OnInit {

  @Input() toDo!: ToDo;

  @Input() readonly = false;

  get stati$() {
    return this.dal.statiToDo$;
  }



  constructor(
    private dal: DalService,
  ) { }

  ngOnInit() { }


  aggiungiCampo(tipo: 'flag' | 'testo') {
    if (!this.toDo.campiAggiuntivi) {
      this.toDo.campiAggiuntivi = [];
    }
    this.toDo.campiAggiuntivi.push({
      tipo,
      descrizione: '',
      valore: undefined
    });
  }

  rimuoviCampo(campo: CampoAggiuntivo) {
    this.toDo.campiAggiuntivi = this.toDo.campiAggiuntivi.filter(c => c !== campo);
  }
}
