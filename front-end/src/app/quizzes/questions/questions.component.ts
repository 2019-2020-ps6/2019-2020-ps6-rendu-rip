import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/Question.model';
import { Answer } from '../../../models/answer.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  answerSelected: Answer;
  show: boolean;

  @Input()
  question: Question;


  @Output()
  questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();


  public answers: Answer[];
  constructor() { }

  ngOnInit() {
    this.answers = this.question.answers;
  }
  supprAnswer(answer: Answer) {
    this.answers.splice(this.answers.indexOf(answer), 1);
  }
  editAnswer(answer: Answer) {
    this.answerSelected = answer;
    this.switchShow(true);
  }

  deleteQuestion() {
    this.questionDeleted.emit(this.question);
  }
  createAnswer() {
    this.switchShow(true);
  }

  reset(show: boolean) {
    this.switchShow(show);
    this.answerSelected = null;
  }
  switchShow(show: boolean) {
    this.show = show;
  }
}
