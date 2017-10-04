import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Coffee } from "./../coffee";
import { UsersService } from "./../users.service";

@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
})
export class CoffeesComponent implements OnInit {

  private coffees: Coffee[] = [];
  public moment = moment;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.selected
          .subscribe(selected => {
            this.userService.getCoffees()
              .subscribe(data => {
                this.coffees = data;
              });
          })
  }
}
