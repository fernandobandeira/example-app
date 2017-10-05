import { Component, OnInit, ViewContainerRef } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
    public toastr: ToastsManager,
    public vRef: ViewContainerRef,
  ) {
    this.coffeeForm = this.fb.group({
      date: [''],
      time: [''],
    });
    this.toastr.setRootViewContainerRef(vRef);
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
        this.toastr.success('Coffee created');
        this.coffees.push(coffee);
        this.userService.getCoffees()
          .subscribe(coffees => {
            this.coffees = coffees;
          });
      }, error => {
        this.toastr.error(error);
      });
  }
}
