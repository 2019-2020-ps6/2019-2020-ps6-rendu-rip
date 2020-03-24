import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-display-right-answer',
  templateUrl: './display-right-answer.component.html',
  styleUrls: ['./display-right-answer.component.scss']
})
export class DisplayRightAnswerComponent implements OnInit {
  
  @Input()
  question: Question;

  constructor() { }

  ngOnInit() {
  }

}
