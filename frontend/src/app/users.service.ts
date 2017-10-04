import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from "./user";

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  private url: string = "http://localhost:8000/api/users";
  public selected: User;

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get(this.url)
      .map(res => res.json());
  }

  getCoffees() {
    return this.http.get(`${this.url}/${this.selected.id}/coffees`)
      .map(res => res.json());
  }
}
