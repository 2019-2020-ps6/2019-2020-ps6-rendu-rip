import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../../../models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { Img } from '../../../../models/image.model';
import { Router } from '@angular/router';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() quiz: Quiz;
  
  image: Img;
  constructor(public globalService: GlobalService, public router: Router) {
  }

  ngOnInit() {
    this.loadImage();
  }

  loadImage(){
    this.image = {} as Img;
    const id = this.question.imageId;
    if(id) this.globalService.loadQuestionImage(this.image, id);
  }
  
  deleteQuestion() {
    this.globalService.deleteQuestion(this.quiz.id, this.question.id);
  }
}
