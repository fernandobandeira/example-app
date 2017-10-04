import { Component, OnInit } from '@angular/core';

import { Coffee } from "./../coffee";
import { UsersService } from "./../users.service";

@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
})
export class CoffeesComponent implements OnInit {

  private coffees: Coffee[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getCoffees()
      .subscribe(data => {
        this.coffees = data;
        console.log(data);
      });
  }
}
