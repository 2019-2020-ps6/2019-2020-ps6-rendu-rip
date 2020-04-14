import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'src/models/answer.model';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';

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
    let id = this.rightAnswer.imageId;
    if(id!=null) this.imageService.loadAnswerImage(this.image, id);
    id = this.answerSelected.imageId;
    if(id!=null) this.imageService.loadAnswerImage(this.imageSel, id);
  }

  getImgSrc() { return this.imageService.sanitize(this.image.url) }

  getImgSrcSel() { return this.imageService.sanitize(this.imageSel.url) }

}
