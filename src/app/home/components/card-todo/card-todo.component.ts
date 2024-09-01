import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DalService } from 'src/app/dal.service';
import { ToDo } from 'src/app/models';
import { UtilsService } from 'src/app/utils.service';
import { ModalTodoComponent } from '../modal-todo/modal-todo.component';

@Component({
  selector: 'app-card-todo',
  templateUrl: './card-todo.component.html',
  styleUrls: ['./card-todo.component.scss'],
})
export class CardTodoComponent implements OnInit {

  @Input() todo!: ToDo;

  constructor(
    private utils: UtilsService,
  ) { }

  ngOnInit() { }


  async apri() {
    await this.utils.apriModal({
      component: ModalTodoComponent,
      componentProps: {
        toDo: this.todo
      }
    });
  }

  }
