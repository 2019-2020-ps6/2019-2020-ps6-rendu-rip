import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
@Component({
  selector: 'app-answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.scss']
})

export class AnswerViewComponent implements OnInit {

  @Input() answer: Answer;
  @Input() question : Question;
  @Input() quiz : Quiz;

  constructor() {}

  ngOnInit() {}
}