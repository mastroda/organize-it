import { Component, OnInit } from '@angular/core';

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
    { label: 'About', icon: 'help-circle', link: 'about' },
  ];


  constructor() { }

  ngOnInit() {
  }
}
