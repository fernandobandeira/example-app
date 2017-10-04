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
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
        this.filteredUsers = this.users;
      });

    this.userService.selected
      .subscribe(selected => this.selected = selected);
  }

  changeSelected(user: User) {
    this.userService.changeSelected(user);
    this.filteredUsers = this.users.filter(u => u !== user);
  }
}
