import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DalService } from '../dal.service';
import { UtilsService } from '../utils.service';

interface MenuItem {
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  menuItems: MenuItem[] = [
    { label: 'Lista ToDo', icon: 'albums', link: 'todos' },
    { label: 'Dashboard', icon: 'analytics', link: 'dashboard' },
  ];


  constructor(
    private dal: DalService,
    private utils: UtilsService,
  ) { }

  ngOnInit() {

    this.avvio();
  }

  /**
   * Logica di avvio dell'intera pagina Home
   */
  async avvio() {
    await this.caricaToDos();
  }

  /**
   * Caricamento lista todos, in caso di errore viene lanciato un alert
   */
  async caricaToDos() {
    const res = await lastValueFrom(this.dal.caricaToDos());

    if (!res.isOk) {
      this.utils.apriAlert({
        header: 'Errore',
        subHeader: 'Caricamento ToDos',
        message: res.errore,
      });
    }
  }
}

