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

  getServerUrl(): string {
    console.log(serverUrl);
    return serverUrl;
  }

  setQuizzes(quizzes: Quiz[]) {
    this.quizzes = quizzes;
    this.quizzes$.next(this.quizzes);

  }

  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizzes) => this.setQuizzes(quizzes));

  }

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

  setQuiz(quiz:Quiz){
    this.quizSelected$.next(quiz);
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => this.setQuiz(quiz));
  }

  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz , question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  addAnswer(quiz: Quiz, question: Question, answerToAdd: Answer) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/';
    this.http.post<Answer>(answerUrl, answerToAdd, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteAnswer(quiz: Quiz, question: Question, answerToDelete: Answer) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/' + answerToDelete.id;
    this.http.delete<Answer>(answerUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  updateAnswer(quiz: Quiz, question: Question, answerToUpdate: Answer) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/' + answerToUpdate.id;
    this.http.put<Answer>(answerUrl,answerToUpdate, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  updateQuiz(quizToUpdate: Quiz, changes: {name: String, theme: String, image?: String}) {
    const answerUrl = this.quizUrl + '/' + quizToUpdate.id;
    console.log(changes);
    this.http.put<Answer>(answerUrl,changes, this.httpOptions).subscribe((newQuiz) => this.setSelectedQuiz(newQuiz.id));
  }


  /*
  setQuizzesFromUrl(){
    this.http.get<{quizzes : Quiz[]}>(this.quizUrl).subscribe((quizzes) =>  this.setQuizzes(quizzes.quizzes));
  }
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
