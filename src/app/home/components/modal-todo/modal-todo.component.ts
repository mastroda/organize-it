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

  readonly = false;

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
    this.readonly = true;
    const res = await lastValueFrom(this.dal.salvaToDo(this.toDo));
    this.readonly = false;

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


  async elimina() {

    const resAlert = await this.utils.apriAlert({
      header: 'Conferma',
      subHeader: 'Eliminazione ToDo',
      message: 'Sicuro di voler eliminare questa ToDo?',
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        { text: 'Si, elimina', role: 'ok' }
      ]
    });
    if (resAlert.role !== 'ok') {
      return;
    }

    this.readonly = true;
    const res = await lastValueFrom(this.dal.salvaToDo(this.toDo));
    this.readonly = false;

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
