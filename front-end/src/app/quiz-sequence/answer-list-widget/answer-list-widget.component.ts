import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-answer-list-widget',
  templateUrl: './answer-list-widget.component.html',
  styleUrls: ['./answer-list-widget.component.scss']
})
export class AnswerListWidgetComponent implements OnInit {

  @Input()
  answers: Answer[];
  /*@Output()
  selected: EventEmitter<Answer> = new EventEmitter<Answer>();
  */

  answerSelected : Answer;

  constructor() { }

  ngOnInit() {
  }

  selectAnswer(answer : Answer) {
    this.answerSelected = answer;
  }





}
