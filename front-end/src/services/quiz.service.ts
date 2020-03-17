import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {HttpClient} from'@angular/common/http';

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
  private quizzes: Quiz[] = QUIZ_LIST;
  private quizUrl = ' https://api.myjson.com/bins/13ajhy';


  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  

  constructor(private http : HttpClient) {
    this.setQuizzesFromUrl();
  }


  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    quiz.id=(this.quizzes.length).toString();
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz : Quiz){
    this.quizzes.splice(this.quizzes.indexOf(quiz),1);
    this.reindex();
    this.quizzes$.next(this.quizzes);
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
    this.http.get<{quizzes : Quiz[]}>(this.quizUrl).subscribe((quizzes) =>  this.setQuizzes(quizzes.quizzes));
  
  }
  
}
