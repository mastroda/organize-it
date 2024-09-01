import { Component, Input, OnInit } from '@angular/core';
import { DalService } from 'src/app/dal.service';
import { ToDo } from 'src/app/models';

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

}
