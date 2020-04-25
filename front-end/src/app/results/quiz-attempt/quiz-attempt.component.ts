import { Component, OnInit, Input } from '@angular/core';
import { Attempt } from 'src/models/attempt.model';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.scss']
})
export class QuizAttemptComponent implements OnInit {

  @Input()
  attempt: Attempt;

  quiz: Quiz = {} as Quiz;

  constructor(public quizService: QuizService) {  
  }

  loaded() {
    return this.attempt && this.quiz;
  }

  ngOnInit() {
    this.quizService.retrieveQuiz(this.attempt.quizId, this.quiz);
  }
}
