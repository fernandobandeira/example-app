import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  private url: string = "http://localhost:8000/api/users";

  constructor(private http: Http) { }

  getUsers(){
    return this.http.get(this.url)
      .map(res => res.json());
  }

}
