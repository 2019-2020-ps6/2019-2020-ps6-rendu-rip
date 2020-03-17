import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {HttpClient} from'@angular/common/http';
import { QuizService } from './quiz.service';
import { Quiz } from 'src/models/quiz.model';




@Injectable({
    providedIn: 'root'
  })


  export class QuestionService {
    private questions: Question[] = [];
    private quizUrl = serverUrl + '/quizzes';
    private httpOptions = httpOptionsBase;
    private questionsPath = 'questions';
    private quizId;
    public quizSelected$: Subject<Quiz> = new Subject


  

  constructor(private http : HttpClient){}

  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);
  /*
  addQuestion(question: Question) {
    question.id=this.questions.length;
    this.questions.push(question);
    this.questions$.next(this.questions);
  }
  deleteQuestion(question : Question){
    this.questions.splice(this.questions.indexOf(question),1);
    this.reindex();
    this.questions$.next(this.questions);   
  }
  reindex(){
    for (var i = 0; i < this.questions.length; i++) {
      this.questions[i].id=i.toString();
  }
}
  
  
  */
  

 setSelectedQuiz(quizId: string) {
  const urlWithId = this.quizUrl + '/' + quizId;
  this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
    this.quizSelected$.next(quiz);
  });
}
  addQuestion(quiz : Quiz, question: Question){
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    console.log(quiz.id);
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz : Quiz , question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    console.log(quiz.id);
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  setQuestions(quiz: Quiz){
    this.quizId = quiz.id;
    this.questions = quiz.questions;
    this.questions$.next(this.questions);
   
  }
  }