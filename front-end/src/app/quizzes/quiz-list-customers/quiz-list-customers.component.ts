import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-list-customers',
  templateUrl: './quiz-list-customers.component.html',
  styleUrls: ['./quiz-list-customers.component.scss']
})
export class QuizListCustomersComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
  }

  ngOnInit() {
  }

 /* quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }*/

}
