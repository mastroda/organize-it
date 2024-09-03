import { Component, OnInit } from '@angular/core';
import { DalService } from 'src/app/dal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {


  get todos$() {
    return this.dal ;
  }

  constructor(
    private dal: DalService
  ) { }

  ngOnInit() {}

}
