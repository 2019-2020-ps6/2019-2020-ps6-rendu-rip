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
      console.log("Quiz: quiz added");
      console.log(quiz);
      this.setQuizzesFromUrl();
    });
  }

  addQuizWithImage(quiz: Quiz, image: Img) {
    const url = serverUrl + '/images/quiz';
    //chained requests
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      quiz.imageId = (img.id).toString();
      console.log("Quiz: creating with image...");
      console.log(quiz);
      this.addQuiz(quiz);//met à jour observable
    });
  }

  updateQuiz(quiz: Quiz) {
    const url = this.quizUrl + '/' + quiz.id;
    this.http.put<Quiz>(url, quiz, this.httpOptions).subscribe(quiz => {
      console.log("Quiz: quiz updated");
      console.log(quiz);
      //this.setQuiz(quiz); --> pb
      this.setSelectedQuiz(quiz.id);//for now -- mais après mettre à jour autrement --> pour éviter rechargement infos sur page (pas beau) 
      this.setQuizzesFromUrl();
    });
  }

  updateQuizWithImage(quiz: Quiz, image: Img){
    const url = serverUrl + '/images/quiz';
    //chained requests
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      quiz.imageId = (img.id).toString();
      console.log("Quiz: saving with image...");
      console.log(quiz);
      this.updateQuiz(quiz);//met à jour observable
    });
  }

  deleteQuiz(quiz: Quiz) {
    const url = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(url, this.httpOptions).subscribe(() => {
      console.log("Quiz: deleted");
      this.setQuizzesFromUrl();
    });
  }

  addQuestion(quiz: Quiz, question: Question) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(url, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz , question: Question) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(url, this.httpOptions).subscribe(() =>  this.setSelectedQuiz(quiz.id));
  }

  updateQuestion(quiz: Quiz, questionToUpdate: Question) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + questionToUpdate.id;
    this.http.put<Question>(url, questionToUpdate, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  addAnswer(quiz: Quiz, question: Question, answerToAdd: Answer) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/';
    this.http.post<Answer>(url, answerToAdd, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  updateAnswer(quiz: Quiz, question: Question, answerToUpdate: Answer) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/' + answerToUpdate.id;
    this.http.put<Answer>(url, answerToUpdate, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteAnswer(quiz: Quiz, question: Question, answerToDelete: Answer) {
    const url = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answersPath + '/' + answerToDelete.id;
    this.http.delete<Answer>(url, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }
}
