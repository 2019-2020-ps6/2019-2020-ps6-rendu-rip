import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {HttpClient} from '@angular/common/http';
import { QuizService } from './quiz.service';
import { Quiz } from 'src/models/quiz.model';




@Injectable({
    providedIn: 'root'
  })


export class QuestionService {
  private quizUrl = serverUrl + '/quizzes';
  private httpOptions = httpOptionsBase;
  private questionsPath = 'questions';
  private quizId;
  // tslint:disable-next-line: new-parens
  public quizSelected$: Subject<Quiz> = new Subject;

  constructor(private http: HttpClient) {}

}
