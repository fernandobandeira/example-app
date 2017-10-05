import { Component, OnInit } from '@angular/core';

import { User } from "./../user";
import { UsersService } from "./../users.service";

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
})
export class UserSelectComponent implements OnInit {

  private users: User[] = [];
  private filteredUsers: User[] = [];
  public selected: User;

  constructor(public userService: UsersService) { }

  ngOnInit() {
    this.userService.users
      .subscribe(users => {
        this.users = users;
        this.filterUsers();
      });

    this.userService.selected
      .subscribe(selected => {
        this.selected = selected
        this.filterUsers();
      });
  }

  changeSelected(user: User) {
    this.userService.changeSelected(user);
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      if(this.selected !== null) {
        return this.selected.id !== user.id;
      }
      return true;
    });
  }
}
