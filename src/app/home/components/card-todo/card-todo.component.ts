import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DalService } from 'src/app/dal.service';
import { ToDo } from 'src/app/models';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-card-todo',
  templateUrl: './card-todo.component.html',
  styleUrls: ['./card-todo.component.scss'],
})
export class CardTodoComponent implements OnInit {

  @Input() todo!: ToDo;

  constructor(
    private dal: DalService,
    private utils: UtilsService,
  ) { }

  ngOnInit() { }


  async salva() {
    this.todo.descrizione += ` [${this.utils.getRandomString(2)}]`;
    await lastValueFrom(this.dal.salvaToDo(this.todo));
    await lastValueFrom(this.dal.caricaToDos());
  }


  async elimina() {
    await lastValueFrom(this.dal.eliminaToDo(this.todo.id));
    await lastValueFrom(this.dal.caricaToDos());
  }
}
