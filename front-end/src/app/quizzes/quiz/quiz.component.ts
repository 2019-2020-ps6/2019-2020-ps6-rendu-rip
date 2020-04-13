import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { Img } from '../../../models/image.model';
import { QuizService } from 'src/services/quiz.service';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

  @Input() quiz: Quiz;
  @Output() quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();
  image: Img;

  constructor(public quizService : QuizService, public imageService : ImageService) {}

  ngOnInit() { this.loadImage(); }

  //default image if no imgId in Quiz
  loadImage(){
    this.image = {} as Img;
    const id = this.quiz.imageId;
    this.imageService.loadQuizImage(this.image, id);
  }

  deleteQuiz() { this.quizDeleted.emit(this.quiz); }

  displayImage() { return this.imageService.sanitize(this.image.url) }
}
