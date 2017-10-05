import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from "./../user";
import { UsersService } from "./../users.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ['.ng-invalid { border-color: #d9534f; }'],
})
export class ProfileComponent implements OnInit {

  public selected: User;
  public profileForm: FormGroup;

  constructor(
    public userService: UsersService,
    private fb: FormBuilder,
  ) {
    this.profileForm = this.fb.group({
      fullname: ['', Validators.required ],
      username: ['', Validators.required ],
    });
  }

  ngOnInit() {
    this.userService.selected
      .subscribe(selected => {
        this.selected = selected;
        this.profileForm.setValue({
          fullname: selected.fullname,
          username: selected.username,
        });
      });
  }

  updateProfile() {
    if (!this.profileForm.valid) {
      return;
    }

    this.userService.updateUser(this.profileForm.value)
      .subscribe(user => {
        this.userService.changeSelected(user);
        this.userService.refreshUsers();
      });
  }

}
