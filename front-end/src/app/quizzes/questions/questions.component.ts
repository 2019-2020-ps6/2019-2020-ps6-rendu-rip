import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/Question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  @Input() question: Question;
  @Input() quiz: Quiz;
  
  image: Img;
  constructor(public quizService: QuizService, public imageService: ImageService, public router: Router) {
  }

  ngOnInit() {
    this.loadImage();
  }

  loadImage(){
    this.image = {} as Img;
    const id = this.question.imageId;
    if(id) this.imageService.loadQuestionImage(this.image, id);
  }

  getImgSrc() { return this.imageService.sanitize(this.image.url) }   
  
  deleteQuestion() {
    this.quizService.deleteQuestion(this.quiz, this.question);
  }

}
