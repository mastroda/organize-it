import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDo } from 'src/app/models';
import { UtilsService } from 'src/app/utils.service';

/**
 * Componente in forma di card che rappresenta la ToDo
 * 
 * @param todo: ToDo
 * @param button: boolean. Default false
 * 
 * @event eClick => ToDo. L'evento viene emesso solo se `button` = true
 * 
 * 
 * @example
 *<app-card-todo [todo]="myTodo" [button]="true" (eClick)="myEvent($event)"></app-card-todo>
 */
@Component({
  selector: 'app-card-todo',
  templateUrl: './card-todo.component.html',
  styleUrls: ['./card-todo.component.scss'],
})
export class CardTodoComponent implements OnInit {

  @Input() todo!: ToDo;
  @Input() button: boolean = false;

  @Output() eClick = new EventEmitter<ToDo>();

  get campiFlag() {
    return this.todo?.campiAggiuntivi ? this.todo.campiAggiuntivi.filter(c => c.tipo === 'flag') : [];
  }

  get campiTesto() {
    return this.todo?.campiAggiuntivi ? this.todo.campiAggiuntivi.filter(c => c.tipo === 'testo') : [];
  }

  constructor(
    private utils: UtilsService,
  ) { }

  ngOnInit() { }


  clicked() {
    if (!this.button) {
      return;
    }
    this.eClick.emit(this.todo);
  }
}
