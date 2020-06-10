import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

import { Attempt } from 'src/models/attempt.model';
import { Quiz } from 'src/models/quiz.model';
import { Img } from 'src/models/image.model';
import { GlobalService } from './global.service';
import { Subject } from 'rxjs';
import { SortDatePipe } from './sortDate.pipe';

@Injectable({
  providedIn: 'root'
})

export class AttemptService {
  private httpOptions = httpOptionsBase;
  public attempts$: Subject<boolean> = new Subject();

  constructor(private sortDate : SortDatePipe, private http: HttpClient) {}

  getPlayerAttempts(playerId: string, output: Attempt[]) {
    this.http.get<Attempt[]>(`${serverUrl}/players/${playerId}/attempts`, this.httpOptions)
    .subscribe( attempts =>  {
      attempts.forEach(element => output.push(element));
      this.sortDate.transform(output, "-date")
    });
  } 

  getSpecificPlayerAttempt(playerId: string, attemptId: number, output: Attempt) {
    this.http.get<Attempt>(`${serverUrl}/players/${playerId}/attempts/${attemptId}`, this.httpOptions)
    .subscribe( attempt => {
      output.id = attempt.id;
      output.playerId = attempt.playerId;
      output.quiz = attempt.quiz;
      output.date = attempt.date;
      output.timeOuts = attempt.timeOuts;
      output.wrongAnswers = attempt.wrongAnswers;
    });
  }

  getAllFromSpecificAttempt(globalService: GlobalService, playerId: string, attemptId: number, attemptToLoad: Attempt) {
    this.http.get<Attempt>(`${serverUrl}/players/${playerId}/attempts/${attemptId}`, this.httpOptions)
    .subscribe( attempt => {
      attemptToLoad.id = attempt.id;
      attemptToLoad.playerId = attempt.playerId;
      attemptToLoad.quiz = attempt.quiz;
      for(let quest of attemptToLoad.quiz.questions) {
        quest.image = {} as Img;
        globalService.loadQuestionImage(quest.image, quest.imageId);
        for(let ans of quest.answers) {
          ans.image = {} as Img;
          globalService.loadAnswerImage(ans.image, ans.imageId);
        }
      }
      //load quiz image
      //load questions images
      //load answers/wrong answers images
      attemptToLoad.date = attempt.date;
      attemptToLoad.timeOuts = attempt.timeOuts;
      attemptToLoad.wrongAnswers = attempt.wrongAnswers;
      for(let ans of attemptToLoad.wrongAnswers) {
        ans.image = {} as Img;
        globalService.loadAnswerImage(ans.image, ans.imageId);
      }
      attemptToLoad.quiz.image = {} as Img;
      globalService.loadQuizImage(attemptToLoad.quiz.image, attemptToLoad.quiz.imageId);
      //globalService.loadQuizAndImage(attempt.quiz.id, quizToLoad, imageToLoad);
    });
  }

  sendAttempt(attempt: Attempt) {
    this.http.post<Attempt>(`${serverUrl}/players/${attempt.playerId}/attempts`, attempt, this.httpOptions)
    .subscribe(() => console.log("Sending attempt... request OK"));
  }

  deleteAttempt(attempt : Attempt){
    this.http.delete<Attempt>(`${serverUrl}/players/${attempt.playerId}/attempts/${attempt.id}`,this.httpOptions)
    .subscribe(() => this.attempts$.next(true))
  }
}
