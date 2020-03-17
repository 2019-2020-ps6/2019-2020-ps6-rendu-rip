import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {HttpClient} from'@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Question } from 'src/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[];
  //private quizUrl = ' http://localhost:9428/api/quizzes';
  
  private quizUrl = serverUrl + '/quizzes';
  private httpOptions = httpOptionsBase;
  public quizSelected$: Subject<Quiz> = new Subject();
  private questionsPath = 'questions';

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  

  constructor(private http : HttpClient) {
    this.setQuizzesFromUrl();
  }

  /*
  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    quiz.id=(this.quizzes.length).toString();
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }
  */
 addQuiz(quiz: Quiz) {
  this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
}

/*
  deleteQuiz(quiz : Quiz){
    this.quizzes.splice(this.quizzes.indexOf(quiz),1);
    this.reindex();
    this.quizzes$.next(this.quizzes);
  }
  */
 deleteQuiz(quiz: Quiz) {
  const urlWithId = this.quizUrl + '/' + quiz.id;
  this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
}


  reindex(){
    for (var i = 0; i < this.quizzes.length; i++) {
      this.quizzes[i].id=i.toString();
  }
}

  setQuizzes(quizzes:Quiz[]){
    this.quizzes = quizzes;
    this.quizzes$.next(this.quizzes);
   
  }
  setQuizzesFromUrl(){
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizzes) =>  this.setQuizzes(quizzes));
  
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
    console.log(this.quizSelected$);
  }
    addQuestion(quiz : Quiz, question: Question){
      const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
      this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    }
  
    deleteQuestion(quiz : Quiz , question: Question) {
      const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
      this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
    }


  /*
  setQuizzesFromUrl(){
    this.http.get<{quizzes : Quiz[]}>(this.quizUrl).subscribe((quizzes) =>  this.setQuizzes(quizzes.quizzes));
  
  }
  */
  
}
