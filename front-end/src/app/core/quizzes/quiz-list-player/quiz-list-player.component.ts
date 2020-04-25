import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-quiz-list-player',
  templateUrl: './quiz-list-player.component.html',
  styleUrls: ['./quiz-list-player.component.scss']
})
export class QuizListPlayerComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes) => this.quizList = quizzes);
  }

  ngOnInit() {
  }
}
