import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

import { User } from 'src/models/user.model';
import { Attempt } from 'src/models/attempt.model';

@Injectable({
  providedIn: 'root'
})

export class AttemptService {
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {   }

  getUserAttempts(userId: string, output: Attempt[]) {
    this.http.get<Attempt[]>(`${serverUrl}/users/${userId}/attempts/`, this.httpOptions)
    .subscribe( attempts =>  
      attempts.forEach(element => output.push(element)) );
  } 

  getSpecificUserAttempts(userId: string, attemptId: number, output: Attempt) {
    this.http.get<Attempt>(`${serverUrl}/users/${userId}/attempts/${attemptId}`, this.httpOptions)
    .subscribe( attempt => {
      output.id = attempt.id;
      output.userId = attempt.userId;
      output.quizId = attempt.quizId;
      output.date = attempt.date;
      output.timeOuts = attempt.timeOuts;
      output.wrongAnswers = attempt.wrongAnswers;
    });
  }

  sendAttempt(attempt: Attempt) {
    this.http.post<Attempt>(`${serverUrl}/users/${attempt.userId}/attempts/`, attempt, this.httpOptions)
    .subscribe(() => console.log("Sending attempt .."));
  }

}
