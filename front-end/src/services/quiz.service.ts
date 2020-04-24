import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

import { Quiz } from '../models/quiz.model';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { Img } from 'src/models/image.model';

@Injectable({
  providedIn: 'root'
})

export class QuizService {

  private quizzes: Quiz[];
  // private quizUrl = ' http://localhost:9428/api/quizzes';

  quizUrl = serverUrl + '/quizzes';
  httpOptions = httpOptionsBase;
  private questionsPath = 'questions';
  private answersPath = 'answers';
  

  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public quizSelected$: Subject<Quiz> = new Subject();
  public currentQuestionNumber$ : BehaviorSubject<number> = new BehaviorSubject(0);
  public currentQuestionNumber : number = 0;

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  //getHttpClient(): HttpClient { return this.http; }

  //getServerUrl(): string { return serverUrl; }

  //getHttpOptions(): Object { return this.httpOptions; }

  retrieveQuiz(quizId: string,output: Quiz) {
    const url = `${this.quizUrl}/${quizId}`;
    this.http.get<Quiz>(url).subscribe((quiz) => {
      output.id = quiz.id;
      output.name = quiz.name;
      output.creationDate = quiz.creationDate;
      output.questions = quiz.questions;
      output.theme = quiz.theme;
      output.imageId = quiz.imageId;
    });
  }

  setQuizzes(quizzes: Quiz[]) {
    console.log("In setQuizzes");
    console.log(quizzes);
    this.quizzes = quizzes;
    this.quizzes$.next(this.quizzes);
  }

  setQuizzesFromUrl() { this.http.get<Quiz[]>(this.quizUrl).subscribe((quizzes) => this.setQuizzes(quizzes)); }

  setQuiz(quiz: Quiz){ this.quizSelected$.next(quiz); }

  setSelectedQuiz(quizId: string) {
    const url = `${this.quizUrl}/${quizId}`;
    this.http.get<Quiz>(url).subscribe((quiz) => this.setQuiz(quiz));
  }

  addQuiz(quiz: Quiz) { this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions)
    .subscribe((quiz) => {
      this.setQuizzesFromUrl();
      this.setSelectedQuiz(quiz.id);
    })};

  addQuizWithImage(quiz: Quiz, image: Img) {
    const url = `${serverUrl}/images/quiz`;
    //chained requests
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      quiz.imageId = (img.id).toString();
      this.addQuiz(quiz);//met à jour observable
    });
  }

  updateQuiz(quiz: Quiz) {
    const url = `${this.quizUrl}/${quiz.id}`;
    this.http.put<Quiz>(url, quiz, this.httpOptions).subscribe(quiz => {
      this.setSelectedQuiz(quiz.id);
      this.setQuizzesFromUrl();
    });
  }

  updateQuizWithImage(quiz: Quiz, image: Img){
    const url = `${serverUrl}/images/quiz`;
    //chained requests
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      quiz.imageId = (img.id).toString();
      this.updateQuiz(quiz);//met à jour observable
    });
  }

  deleteQuiz(quiz: Quiz) {
    const url = `${this.quizUrl}/${quiz.id}`;
    this.http.delete<Quiz>(url, this.httpOptions).subscribe(() => {
      this.setQuizzesFromUrl();
    });
  }

  addQuestion(quizId: string, question: Question) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}`;
    this.http.post<Question>(url, question, this.httpOptions).subscribe((qu) => {;
      this.setSelectedQuiz(quizId);
      this.setQuizzesFromUrl();
    });
  }

  addQuestionWithImage(quizId: string, question: Question, image: Img) {
    const url = `${serverUrl}/images/question`;
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      question.imageId = img.id;//(img.id).toString();
      this.addQuestion(quizId, question);//met à jour observable
    });
  }

  updateQuestion(quizId: string, question: Question) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${question.id}`;
    this.http.put<Question>(url, question, this.httpOptions).subscribe(() => {
      this.setSelectedQuiz(quizId);
      this.setQuizzesFromUrl();
    });
  }

  updateQuestionWithImage(quizId: string, question: Question, image: Img){
    const url = `${serverUrl}/images/question`;
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      question.imageId = (img.id).toString();
      this.updateQuestion(quizId, question);//met à jour observable
    });
  }

  deleteQuestion(quiz: Quiz , question: Question) {
    const url = `${this.quizUrl}/${quiz.id}/${this.questionsPath}/${question.id}`;
    this.http.delete<Question>(url, this.httpOptions).subscribe(() => {
      this.setSelectedQuiz(quiz.id);
      this.setQuizzesFromUrl();
    });
  }

  addAnswer(quizId: string, questionId: string, answer: Answer) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}/${this.answersPath}`;
    this.http.post<Answer>(url, answer, this.httpOptions).subscribe(() => {
      this.setSelectedQuiz(quizId);
      this.setQuizzesFromUrl();
    });
  }

  addAnswerWithImage(quizId: string, questionId: string, answer: Answer, image: Img) {
    const url = `${serverUrl}/images/answer`;
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      answer.imageId = img.id;//(img.id).toString();
      this.addAnswer(quizId, questionId, answer);//met à jour observable
    });
  }

  updateAnswer(quizId: string, questionId: string, answer: Answer) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}/${this.answersPath}/${answer.id}`;
    this.http.put<Answer>(url, answer, this.httpOptions).subscribe(() => {
      this.setQuizzesFromUrl();
      this.setSelectedQuiz(quizId)
    });
  }

  updateAnswerWithImage(quizId: string, questionId: string, answer, image: Img){
    const url = `${serverUrl}/images/answer`;
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      answer.imageId = (img.id).toString();
      this.updateAnswer(quizId, questionId, answer);//met à jour observable
    });
  }

  deleteAnswer(quiz: Quiz, question: Question, answerToDelete: Answer) {
    const url = `${this.quizUrl}/${quiz.id}/${this.questionsPath}/${question.id}/${this.answersPath}/${answerToDelete.id}`;
    this.http.delete<Answer>(url, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  loadQuestion(question : Question, quizId:string, questionId: string){
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}`;
    this.http.get<Question>(url, this.httpOptions).subscribe(question1 => {
      question.id = question1.id;
      question.imageId = question1.imageId;
      question.label = question1.label;
      question.quizId = question1.quizId;
      question.answers = question1.answers;
    });
  }

  quizInvalid(quiz :Quiz){
    if(!quiz.name) {
      window.alert("Veuillez donner un nom au quiz")
      return true;
    }
    else if(!quiz.theme){
      window.alert("Veuillez donner un thème au quiz")
      return true;
    }
    return false;
  }

  questionInvalid(question : Question){
    if(!question.label) {
      window.alert("Veuillez mettre une question")
      return true;
    }
    return false;
  }
  answersInvalid(question : Question){
    let errorMessage = "";
    if(!question.answers|| question.answers.length==0){
      errorMessage = "Il n'y a pas de réponses possibles."
    }
    if(question.answers.length!=4){
      errorMessage = "Il faudrait 4 réponses."
    }
    var oneRightAnswer = 0
    question.answers.forEach(element => { if(element.isCorrect) oneRightAnswer++ })
    if(oneRightAnswer>1){
      errorMessage = "Il y a plus d'une réponse correcte."
    }
    if(oneRightAnswer===0){
      errorMessage = "Il n'y a pas de réponse correcte."
    }
    return errorMessage;
  }

  answerInvalid(answer : Answer, imageId : string){
    if(!answer.value && (answer.imageId || imageId)) { 
      window.alert("Veuillez mettre une réponse ou une image.")
      return true;
    }
  }
}
