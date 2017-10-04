import { Component } from '@angular/core';

import { User } from "./user";
import { UsersService } from "./users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public userService: UsersService) { }

  public selected: User;

  ngOnInit() {
    this.userService.selected
      .subscribe(selected => this.selected = selected);
  }
}
