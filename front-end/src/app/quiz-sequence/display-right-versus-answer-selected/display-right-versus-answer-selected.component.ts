import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-display-right-versus-answer-selected',
  templateUrl: './display-right-versus-answer-selected.component.html',
  styleUrls: ['./display-right-versus-answer-selected.component.scss']
})
export class DisplayRightVersusAnswerSelectedComponent implements OnInit {

  @Input()
  answerSelected:Answer;
  @Input()
  answers:Answer[];

  rightAnswer : Answer;
  constructor() {}

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
