import { Component, OnInit, Input } from '@angular/core';
import { Attempt } from 'src/models/attempt.model';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { GlobalService } from 'src/services/global.service';
import { Img } from 'src/models/image.model';

@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.scss']
})
export class QuizAttemptComponent implements OnInit {

  @Input()
  attempt: Attempt;

  quiz: Quiz = {} as Quiz;

  image: Img = {} as Img;

  constructor(public globalService: GlobalService) {}

  loaded() { return this.attempt && this.quiz; }

  ngOnInit() {
    this.quiz = this.attempt.quiz;
    this.globalService.loadQuizImage(this.image, this.quiz.imageId);
    //this.globalService.loadQuizAndImage(this.attempt.quiz.id, this.quiz, this.image);
  }
}
