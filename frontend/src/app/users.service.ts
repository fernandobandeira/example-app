import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from "./user";
import { Coffee } from "./coffee";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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
      .map(res => res.json())
      .catch(this.handleError);
  }

  getCoffees() {
    return this.http.get(`${this.url}/${this._selected.getValue().id}/coffees`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  changeSelected(user: User) {
    this._selected.next(user);
  }

  updateUser(user: User) {
    return this.http.put(`${this.url}/${this._selected.getValue().id}`, user)
      .map(res => res.json())
      .catch(this.handleError);
  }

  createCoffee(coffee: Coffee) {
    return this.http.post(`${this.url}/${this._selected.getValue().id}/coffees`, coffee)
      .map(res => res.json())
      .catch(this.handleError);
  }

  refreshUsers() {
    this.getUsers()
      .subscribe(users => {
        this._users.next(users);
      });
  }

  handleError(error: any) {
    let errorBody = JSON.parse(error._body);

    if (errorBody.errors !== undefined) {
      let key = Object.keys(errorBody.errors)[0];

      return Observable.throw(errorBody.errors[key][0]);
    }
    if (errorBody.message !== '') {
      return Observable.throw(errorBody.message);
    }

    return Observable.throw('Something went wrong!');
  }
}
