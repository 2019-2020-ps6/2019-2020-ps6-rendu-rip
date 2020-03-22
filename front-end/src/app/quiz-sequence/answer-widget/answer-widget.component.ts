import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-answer-widget',
  templateUrl: './answer-widget.component.html',
  styleUrls: ['./answer-widget.component.scss']
})
export class AnswerWidgetComponent implements OnInit {

  @Input()
  answer: Answer;
  @Output()
  selected: EventEmitter<Answer> = new EventEmitter<Answer>();


  constructor() { }

  ngOnInit() {
  }

  answerSelected() {
    this.selected.emit(this.answer);
  }





}
