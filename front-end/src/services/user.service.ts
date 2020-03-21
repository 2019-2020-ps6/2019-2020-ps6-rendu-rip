import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private userUrl = serverUrl + '/users';

  private httpOptions = httpOptionsBase;
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);

  constructor(private http: HttpClient) { 
    this.setUsersFromUrl()
  }

  /*
  addUser(user: User) {
    user.id = (this.users.length).toString();
    this.users.push(user);
    this.users$.next(this.users);
  }

  deleteUser(user: User) {
    this.users.splice(this.users.indexOf(user), 1);
    this.reindex();
    this.users$.next(this.users);
  }

  reindex() {
    for (let i = 0; i < this.users.length; i++) {
      this.users[i].id = i.toString();
  }
  
}*/

  setUsers(users: User[]) {
    this.users = users;
    this.users$.next(this.users);
  }

  setUsersFromUrl() {
    this.http.get<User[]>(this.userUrl).subscribe((users) => this.setUsers(users));
  }

  addUser(user: User) {
    this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }

  deleteUser(user: User) {
    const urlWithId = this.userUrl + '/' + user.id;
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }
  updateUser(user: User) {
    const urlWithId = this.userUrl + '/' + user.id;
    this.http.put<User>(urlWithId, user, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }

}
