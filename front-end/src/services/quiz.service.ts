import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { Img } from 'src/models/image.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizzes: Quiz[];
  // private quizUrl = ' http://localhost:9428/api/quizzes';

  private quizUrl = serverUrl + '/quizzes';
  private httpOptions = httpOptionsBase;
  private questionsPath = 'questions';
  private answersPath = 'answers';

  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public quizSelected$: Subject<Quiz> = new Subject();
  public currentQuestionNumber$ : BehaviorSubject<number> = new BehaviorSubject(0);
  public currentQuestionNumber : number = 0;

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  getHttpClient(): HttpClient { return this.http; }

  getServerUrl(): string { return serverUrl; }

  getHttpOptions(): Object { return this.httpOptions; }

  setQuizzes(quizzes: Quiz[]) {
    this.quizzes = quizzes;
    this.quizzes$.next(this.quizzes);
  }

  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizzes) => this.setQuizzes(quizzes));
  }

  setQuiz(quiz:Quiz){
    this.quizSelected$.next(quiz);
  }

  setSelectedQuiz(quizId: string) {
    const url = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(url).subscribe((quiz) => this.setQuiz(quiz));
  }

  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe((quiz) => {
      console.log("Quiz: adding quiz...");
      console.log(quiz);
      this.setQuizzesFromUrl();
    });
  }

  deleteQuiz(quiz: Quiz) {
    const url = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(url, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: Quiz, question: Question) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(url, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz , question: Question) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(url, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  addAnswer(quiz: Quiz, question: Question, answerToAdd: Answer) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/';
    this.http.post<Answer>(url, answerToAdd, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteAnswer(quiz: Quiz, question: Question, answerToDelete: Answer) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/' + answerToDelete.id;
    this.http.delete<Answer>(url, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  updateAnswer(quiz: Quiz, question: Question, answerToUpdate: Answer) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/' + answerToUpdate.id;
    this.http.put<Answer>(url, answerToUpdate, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  updateQuiz(quizOld: Quiz, quizNew: Quiz) {
    const url = this.quizUrl + '/' + quizOld.id;
    this.http.put<Quiz>(url, quizNew, this.httpOptions).subscribe(quiz => {
      this.setQuiz(quiz);
      this.setQuizzesFromUrl();
    });//(newQuiz) => this.setSelectedQuiz(newQuiz.id));
  }

//::::::::::::::::::::::::IMAGE FAILURE:::::::::::::::::::::::://
  //not ok... --> so directly called in component.ts
  /*imageByDefault(): Img {
    //TODO: req from server
    let image_res = {} as Img;
    const dft_img_id = "1";
    const url = this.quizUrl + '/images/' + dft_img_id;
    //this.http.get<Quiz>(url).subscribe((quiz) => this.setQuiz(quiz));
    this.http.get<Img>(url).subscribe((img) => {
      console.log("OOOOOOOKKKKKKKKKKKKK");
      image_res.url = img.url;
    });
    console.log(image_res);
    return image_res;
  }*/


 //::::::::::::::::::::::::FRONT END:::::::::::::::::::::::://
  /*
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
  reindex() {
  for (let i = 0; i < this.quizzes.length; i++) {
    this.quizzes[i].id = i.toString();
    }
  }
getAnswers(quiz: Quiz, question: Question) {
  const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
  const result = this.http.get<Answer>(url, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));

  console.log('le resultat est: ', result);
  return result;
}
    */

}
