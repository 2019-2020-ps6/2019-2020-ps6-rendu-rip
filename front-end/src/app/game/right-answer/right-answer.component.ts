import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-right-answer',
  templateUrl: './right-answer.component.html',
  styleUrls: ['./right-answer.component.scss']
})
export class RightAnswerComponent implements OnInit {
  
  @Input()
  answers: Answer[];

  @Input()
  whatRight: String;

  rightAnswer:Answer;

  image: Img;

  constructor(public imageService: ImageService) {}

  ngOnInit() {
    this.setRightAnswer();
    this.loadImage();
  }

  ngOnChanges(){
    this.setRightAnswer();
    this.loadImage();
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

  loadImage(){
    if(this.rightAnswer!=null){
      this.image = {} as Img;
      let id = null
      if(this.rightAnswer) id = this.rightAnswer.imageId;
      if(id) this.imageService.loadAnswerImage(this.image, id);
    }
  }
}
