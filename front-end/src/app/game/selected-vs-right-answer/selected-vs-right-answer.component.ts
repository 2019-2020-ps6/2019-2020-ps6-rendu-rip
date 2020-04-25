import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'src/models/answer.model';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-selected-vs-right-answer',
  templateUrl: './selected-vs-right-answer.component.html',
  styleUrls: ['./selected-vs-right-answer.component.scss']
})

export class SelectedVSRightAnswerComponent implements OnInit {

  @Input()
  answerSelected:Answer;
  @Input()
  answers:Answer[];

  rightAnswer : Answer;

  image: Img;
  imageSel: Img;

  constructor(public imageService: ImageService) {}

  ngOnInit() {
    this.setRightAnswer();
    this.loadImages();
  }

  ngOnChanges(){
    this.setRightAnswer()
    this.loadImages();
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

  loadImages(){
    this.image = {} as Img;
    this.imageSel = {} as Img;
    let id = null;
    if(this.rightAnswer) id = this.rightAnswer.imageId;
    if(id) this.imageService.loadAnswerImage(this.image, id);
    if(this.answerSelected)id = this.answerSelected.imageId;
    if(id) this.imageService.loadAnswerImage(this.imageSel, id);
  }
}
