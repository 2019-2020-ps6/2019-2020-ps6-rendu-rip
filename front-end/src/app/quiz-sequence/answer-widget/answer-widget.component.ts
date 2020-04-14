import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answer } from 'src/models/answer.model';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-answer-widget',
  templateUrl: './answer-widget.component.html',
  styleUrls: ['./answer-widget.component.scss']
})
export class AnswerWidgetComponent implements OnInit {

  @Input() answer: Answer;

  @Output() selected: EventEmitter<Answer> = new EventEmitter<Answer>();

  image: Img;

  constructor(public imageService: ImageService) {}

  ngOnInit() {
    this.loadImage();
  }

  answerSelected() {
    this.selected.emit(this.answer);
  }

  loadImage(){
    this.image = {} as Img;
    let id = null;
    if(this.answer) id = this.answer.imageId;
    if(id) this.imageService.loadAnswerImage(this.image, id);
  }

  getImgSrc() { return this.imageService.sanitize(this.image.url) }
}
