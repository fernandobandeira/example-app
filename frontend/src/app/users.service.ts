import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from "./user";

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  private url: string = "http://localhost:8000/api/users";

  private _users: BehaviorSubject<User []> = new BehaviorSubject([]);
  public readonly users: Observable<User []> = this._users.asObservable();

  private _selected: BehaviorSubject<User> = new BehaviorSubject(null);
  public readonly selected: Observable<User> = this._selected.asObservable();

  constructor(private http: Http) {
    this.refreshUsers();
  }

  getUsers() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getCoffees() {
    return this.http.get(`${this.url}/${this._selected.getValue().id}/coffees`)
      .map(res => res.json());
  }

  changeSelected(user: User) {
    this._selected.next(user);
  }

  updateUser(user: User) {
    return this.http.put(`${this.url}/${this._selected.getValue().id}`, user)
      .map(res => res.json());
  }

  refreshUsers() {
    this.getUsers()
      .subscribe(users => {
        this._users.next(users);
      });
  }
}
