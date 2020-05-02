import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { Img } from 'src/models/image.model';
import { GlobalService } from 'src/services/global.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

  @Input() quiz: Quiz;
  @Output() quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();
  image: Img;

  constructor(public globalService: GlobalService) {}

  ngOnInit() { this.loadImage(); }

  //default image if no imgId in Quiz
  loadImage(){
    this.image = {} as Img;
    const id = this.quiz.imageId;
    this.globalService.loadQuizImage(this.image, id);
  }

  deleteQuiz() { this.quizDeleted.emit(this.quiz); }
}
