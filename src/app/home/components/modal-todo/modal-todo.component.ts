import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { DalService } from 'src/app/dal.service';
import { ToDo } from 'src/app/models';
import { UtilsService } from 'src/app/utils.service';

/**
 * Modal per la gestione (visualizzazione, salvataggio ed eliminazione) di una ToDo
 * 
 * @param toDo: ToDo
 */
@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
  styleUrls: ['./modal-todo.component.scss'],
})
export class ModalTodoComponent implements OnInit {

  @Input() toDo!: ToDo;

  toDoEditabile!: ToDo;

  readonly = false;
  inSalvataggio = false;
  inEliminazione = false;

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
    this.inSalvataggio = true;

    const res = await lastValueFrom(this.dal.salvaToDo(this.toDoEditabile));

    this.inSalvataggio = false;
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
    });

    this.modalController.dismiss();
  }


  async elimina() {

    const resAlert = await this.utils.apriAlert({
      header: 'Conferma',
      subHeader: 'Eliminazione ToDo',
      message: 'Sicuro di voler eliminare questa ToDo?',
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        { text: 'Conferma', role: 'ok' }
      ]
    });
    if (resAlert.role !== 'ok') {
      return;
    }

    this.readonly = true;
    this.inEliminazione = true;

    const res = await lastValueFrom(this.dal.eliminaToDo(this.toDo.id));
    this.inEliminazione = false;
    this.readonly = false;

    if (!res.isOk) {
      await this.utils.apriAlert({
        header: 'Errore',
        subHeader: 'Eliminazione ToDo',
        message: res.errore,
      });
      return;
    }

    this.utils.apriToast({
      message: 'ToDo eliminata!',
      color: 'success',
    });

    this.modalController.dismiss();
  }
}
