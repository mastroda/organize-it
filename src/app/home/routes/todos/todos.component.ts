import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DalService } from 'src/app/dal.service';
import { ToDo } from 'src/app/models';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {

  get todos$() {
    return this.dal.todos$;
  }

  constructor(
    public dal: DalService,
    public utils: UtilsService,
  ) { }

  ngOnInit() { 
    this.carica();
  }


  async carica() {

    const res = await lastValueFrom(this.dal.caricaToDos());
    console.log(res);

  }


  async aggiungi() {
    const nuova: ToDo = {
      descrizione: 'nuova',
      id: '',
      idStato: 1,
      titolo: 'titolo',
      dataCreazione: new Date(),
    };
    const res = await lastValueFrom(this.dal.salvaToDo(nuova));
    console.log(res);

    await this.carica();
  }
}
