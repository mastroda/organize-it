import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CampoAggiuntivo } from 'src/app/models';


/**
 * Form per la gestione di un campo aggiuntivo di una ToDo
 * 
 * @param campo: CampoAggiuntivo
 * @param readonly: boolean. Default false
 * 
 * @event eRimuovi => CampoAggiuntivo
 */
@Component({
  selector: 'app-form-campo-aggiuntivo',
  templateUrl: './form-campo-aggiuntivo.component.html',
  styleUrls: ['./form-campo-aggiuntivo.component.scss'],
})
export class FormCampoAggiuntivoComponent implements OnInit {

  @Input() campo!: CampoAggiuntivo;
  @Input() readonly = false;

  @Output() eRimuovi = new EventEmitter<CampoAggiuntivo>();

  constructor() { }

  ngOnInit() { }

  rimuovi() {
    this.eRimuovi.emit(this.campo);
  }

}
