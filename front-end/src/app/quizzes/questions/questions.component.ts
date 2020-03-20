import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/Question.model';
import { Answer } from '../../../models/answer.model';
import { FormGroup } from '@angular/forms';

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
  questionForm: FormGroup;

  @Output()
  questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();
  AnswerPrinted: EventEmitter<Answer> = new EventEmitter<Answer>();


  public answers: Answer[];

  public CorectAnswer: Answer;

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

  printCorrectAnswer() {
    this.answers.forEach(element => {
      if (element.isCorrect) {
        this.AnswerPrinted.emit();
        this.CorectAnswer = element;
      }
    });
  }
}
