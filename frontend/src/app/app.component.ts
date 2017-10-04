import { Component } from '@angular/core';

import { UsersService } from "./users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public userService: UsersService) { }
}
