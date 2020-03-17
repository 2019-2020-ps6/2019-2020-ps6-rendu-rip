import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { BehaviorSubject } from 'rxjs';



@Injectable({
    providedIn: 'root'
  })


  export class QuestionService {
    private questions: Question[] = [];

    constructor() {}

  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);

  addQuestion(question: Question) {
    question.id = this.questions.length;
    this.questions.push(question);
    this.questions$.next(this.questions);
  }

  deleteQuestion(question: Question) {
    this.questions.splice(this.questions.indexOf(question), 1);
    this.reindex();
    this.questions$.next(this.questions);
  }

  reindex() {
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].id = i;
  }
}

  setQuestions(questions: Question[]) {
    this.questions = questions;
    this.questions$.next(this.questions);

  }
}
