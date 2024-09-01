import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { DalService } from 'src/app/dal.service';
import { ToDo } from 'src/app/models';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
  styleUrls: ['./modal-todo.component.scss'],
})
export class ModalTodoComponent implements OnInit {

  @Input() toDo!: ToDo;

  toDoEditabile!: ToDo;

  inSalvataggio = false;

  constructor(
    private modalController: ModalController,
    private dal: DalService,
    private utils: UtilsService,
  ) {
  }

  ngOnInit() {
    // Clono l'oggetto altrimenti le mofiche sarebbero propagate in tutta l'interfaccia se toDo proviene da un Observable
    this.toDoEditabile = JSON.parse(JSON.stringify(this.toDo));
  }


  annulla() {
    this.modalController.dismiss();
  }

  async salva() {
    this.inSalvataggio = true;
    const res = await lastValueFrom(this.dal.salvaToDo(this.toDo));
    this.inSalvataggio = false;

    if (!res.isOk) {
      await this.utils.apriAlert({
        header: 'Errore',
        subHeader: 'Salvataggio ToDo',
        message: res.errore,
      });
      return;
    }

    await this.utils.apriToast({
      message: 'ToDo salvata!',
      color: 'success',
    })
  }
}
