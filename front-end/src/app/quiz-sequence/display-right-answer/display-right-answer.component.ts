import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-display-right-answer',
  templateUrl: './display-right-answer.component.html',
  styleUrls: ['./display-right-answer.component.scss']
})
export class DisplayRightAnswerComponent implements OnInit {
  
  @Input()
  answers: Answer[];

  rightAnswer:Answer;

  constructor() { }

  ngOnInit() {
    this.setRightAnswer();
  }

  ngOnChanges(){
    this.setRightAnswer()
  }
 
  setRightAnswer() {
    this.rightAnswer =null;
    if(!this.answers)return;
    for (let index = 0; index < this.answers.length; index++) {
      const curAns = this.answers[index];
      if(curAns.isCorrect){
        this.rightAnswer = curAns;
        break;
      }
    }
  }

}
