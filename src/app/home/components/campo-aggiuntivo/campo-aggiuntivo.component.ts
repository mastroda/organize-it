import { Component, Input, OnInit } from '@angular/core';
import { CampoAggiuntivo } from 'src/app/models';

/**
 * Componente che mostra le informazioni del campo aggiuntivo di una ToDo in base alla tipologia di campo
 * 
 * @param campo: CampoAggiuntivo
 */
@Component({
  selector: 'app-campo-aggiuntivo',
  templateUrl: './campo-aggiuntivo.component.html',
  styleUrls: ['./campo-aggiuntivo.component.scss'],
})
export class CampoAggiuntivoComponent implements OnInit {

  @Input() campo!: CampoAggiuntivo;

  constructor() { }

  ngOnInit() { }

}
