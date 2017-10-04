import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from "./user";

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  private url: string = "http://localhost:8000/api/users";

  private _selected: BehaviorSubject<User> = new BehaviorSubject({
    id: undefined,
    username: undefined,
    fullname: undefined,
  });
  public readonly selected: Observable<User> = this._selected.asObservable();

  constructor(private http: Http) { }

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
}
