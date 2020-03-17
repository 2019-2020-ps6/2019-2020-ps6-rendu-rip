import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import {HttpClient} from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private users: User[] = [];
  //private quizUrl = ' https://api.myjson.com/bins/13ajhy';


  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);
  

  constructor(private http : HttpClient) {
    //this.setQuizzesFromUrl();
  }


  addUser(user: User) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    user.id=(this.users.length).toString();
    this.users.push(user);
    this.users$.next(this.users);
  }

  deleteUser(user : User){
    this.users.splice(this.users.indexOf(user),1);
    this.reindex();
    this.users$.next(this.users);
  }

  reindex(){
    for (var i = 0; i < this.users.length; i++) {
      this.users[i].id=i.toString();
  }
}

  setUsers(users:User[]){
    this.users = users;
    this.users$.next(this.users);
   
  }

/*
  setQuizzesFromUrl(){
    this.http.get<{quizzes : Quiz[]}>(this.quizUrl).subscribe((quizzes) =>  this.setQuizzes(quizzes.quizzes));
  
  }
  */
  
}
