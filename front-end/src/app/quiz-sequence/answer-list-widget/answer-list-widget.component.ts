import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
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

  answerSelected : Answer;
  rightAnswer : Answer;

  constructor() { }

  ngOnInit() {
    this.setRightAnswer();
  }

  selectAnswer(answer : Answer) {
    this.answerSelected = answer;
  }

  ngOnChanges(){
    this.reset();
  }

  reset(){
    this.setRightAnswer();
    this.answerSelected = null;
  }
  setRightAnswer() {
    for (let index = 0; index < this.answers.length; index++) {
      const curAns = this.answers[index];
      if(curAns.isCorrect){
        this.rightAnswer = curAns;
        break;
      }  
    }
  }

}
