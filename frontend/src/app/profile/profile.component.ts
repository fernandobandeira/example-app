import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
    public toastr: ToastsManager,
    public vRef: ViewContainerRef,
  ) {
    this.profileForm = this.fb.group({
      fullname: ['', Validators.required ],
      username: ['', Validators.required ],
    });
    this.toastr.setRootViewContainerRef(vRef);
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
        this.toastr.success('Updated user profile');
      }, error => {
        this.userService.changeSelected(this.selected);
        this.toastr.error(error);
      });
  }

}
