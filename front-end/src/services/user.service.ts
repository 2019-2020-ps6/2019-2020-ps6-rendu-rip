import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

import { User } from 'src/models/user.model';
import { Img } from 'src/models/image.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {



  
  private users: User[] = [];
  private userUrl = serverUrl + '/users';

  private httpOptions = httpOptionsBase;
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  public userSelected$: Subject<User> = new Subject();

  constructor(private http: HttpClient) { 
    this.setUsersFromUrl()
  }

  setUsers(users: User[]) {
    this.users = users;
    this.users$.next(this.users);
  }

  setUsersFromUrl() { this.http.get<User[]>(this.userUrl).subscribe((users) => this.setUsers(users)); }

  setUser(user: User){ this.userSelected$.next(user); }

  setSelectedUser(userId: string) {
    const url = `${this.userUrl}/${userId}`;
    this.http.get<User>(url).subscribe((user) => this.setUser(user));
  }

  getUser(usr: User, userId: string) {
    const url = `${this.userUrl}/${userId}`;
    this.http.get<User>(url).subscribe((user) => {
      usr = user; 
      this.setUser(user);
    });
  }

  addUser(user: User) { 
    console.log("user input")
    console.log(user)
    this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe((u) => {
    console.log("user got")
    console.log(u)
    this.setUsersFromUrl()}); }

  addUserWithImage(user: User, image: Img) {
    const url = `${serverUrl}/images/user`;
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      user.imageId = img.id;//(img.id).toString();
      this.addUser(user);//met à jour observable
    });
  }

  deleteUser(user: User) {
    const urlWithId = `${this.userUrl}/${user.id}`;
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }

  updateUser(user: User) {
    const urlWithId = `${this.userUrl}/${user.id}`;
    console.log( user);
    this.http.put<User>(urlWithId, user, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }


  updateUserWithImg(user: User, imgToSave: Img) {
    const url = `${serverUrl}/images/user`;
    this.http.post<Img>(url, imgToSave, this.httpOptions).subscribe(img => {
      user.imageId = img.id;
      this.updateUser(user);
    });

    
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
  */
}
