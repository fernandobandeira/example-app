import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Coffee } from "./../coffee";
import { UsersService } from "./../users.service";

@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
})
export class CoffeesComponent implements OnInit {

  private coffees: Coffee[] = [];
  public moment = moment;
  public coffeeForm: FormGroup;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
  ) {
    this.coffeeForm = this.fb.group({
      date: [''],
      time: [''],
    });
  }

  ngOnInit() {
    this.userService.selected
          .subscribe(selected => {
            this.userService.getCoffees()
              .subscribe(coffees => {
                this.coffees = coffees;
              });
          });
  }

  addCoffee() {
    let {date, time} = this.coffeeForm.value;

    if (date === '') {
      date = moment().format('YYYY-M-D');
    } else {
      date = `${date.year}-${date.month}-${date.day}`;
    }
    if (time === '') {
      time = moment().format('H m');
    } else {
      time = `${time.hour} ${time.minute}`;
    }

    let schedule = moment(`${date} ${time}`, 'YYYY-M-D H m').unix();

    this.userService.createCoffee({ schedule })
      .subscribe(coffee => {
        this.userService.getCoffees()
          .subscribe(coffees => {
            this.coffees = coffees;
          });
      });
  }
}
