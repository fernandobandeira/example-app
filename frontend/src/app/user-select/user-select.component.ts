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

  constructor(public userService: UsersService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
        this.filteredUsers = this.users;
      });
  }

  changeSelected(user) {
    this.userService.selected = user;
    this.filteredUsers = this.users.filter(u => u !== user);
  }
}
