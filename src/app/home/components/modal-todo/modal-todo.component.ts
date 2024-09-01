import { Component, Input, OnInit } from '@angular/core';
import { ToDo } from 'src/app/models';

@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
  styleUrls: ['./modal-todo.component.scss'],
})
export class ModalTodoComponent implements OnInit {

  @Input() toDo!: ToDo;

  constructor() { }

  ngOnInit() { }

}
