import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

import { Player } from 'src/models/player.model';
import { Attempt } from 'src/models/attempt.model';

@Injectable({
  providedIn: 'root'
})

export class AttemptService {
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {   }

  getPlayerAttempts(playerId: string, output: Attempt[]) {
    console.log("wouuhou!");
    this.http.get<Attempt[]>(`${serverUrl}/players/${playerId}/attempts/`, this.httpOptions)
    .subscribe( attempts =>  {
      console.log("double wouuuhouu!");
      attempts.forEach(element => output.push(element));
    });
  } 

  getSpecificPlayerAttempt(playerId: string, attemptId: number, output: Attempt) {
    this.http.get<Attempt>(`${serverUrl}/players/${playerId}/attempts/${attemptId}`, this.httpOptions)
    .subscribe( attempt => {
      output.id = attempt.id;
      output.playerId = attempt.playerId;
      output.quizId = attempt.quizId;
      output.date = attempt.date;
      output.timeOuts = attempt.timeOuts;
      output.wrongAnswers = attempt.wrongAnswers;
    });
  }

  sendAttempt(attempt: Attempt) {
    this.http.post<Attempt>(`${serverUrl}/players/${attempt.playerId}/attempts/`, attempt, this.httpOptions)
    .subscribe(() => console.log("Sending attempt .."));
  }

}
