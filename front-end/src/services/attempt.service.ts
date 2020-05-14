import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

import { Attempt } from 'src/models/attempt.model';
import { Quiz } from 'src/models/quiz.model';
import { Img } from 'src/models/image.model';
import { GlobalService } from './global.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AttemptService {
  private httpOptions = httpOptionsBase;
  public attempts$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {}

  getPlayerAttempts(playerId: string, output: Attempt[]) {
    this.http.get<Attempt[]>(`${serverUrl}/players/${playerId}/attempts/`, this.httpOptions)
    .subscribe( attempts =>  {
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

  getAllFromSpecificAttempt(globalService: GlobalService, playerId: string, attemptId: number, attemptToLoad: Attempt, quizToLoad : Quiz, imageToLoad : Img) {
    this.http.get<Attempt>(`${serverUrl}/players/${playerId}/attempts/${attemptId}`, this.httpOptions)
    .subscribe( attempt => {
      attemptToLoad.id = attempt.id;
      attemptToLoad.playerId = attempt.playerId;
      attemptToLoad.quizId = attempt.quizId;
      attemptToLoad.date = attempt.date;
      attemptToLoad.timeOuts = attempt.timeOuts;
      attemptToLoad.wrongAnswers = attempt.wrongAnswers;
      globalService.loadQuizAndImage(attempt.quizId, quizToLoad, imageToLoad);
    });
  }

  sendAttempt(attempt: Attempt) {
    this.http.post<Attempt>(`${serverUrl}/players/${attempt.playerId}/attempts/`, attempt, this.httpOptions)
    .subscribe(() => console.log("Sending attempt .."));
  }

  deleteAttempt(attempt : Attempt){
    this.http.delete<Attempt>(`${serverUrl}/players/${attempt.playerId}/attempts/${attempt.id}`,this.httpOptions)
    .subscribe(()=>{
      this.attempts$.next(true);
    })
  }
}
