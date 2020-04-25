import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../models/Question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../../models/image.model';
import { ImageService } from 'src/services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

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
  
  deleteQuestion() {
    this.quizService.deleteQuestion(this.quiz, this.question);
  }

}
