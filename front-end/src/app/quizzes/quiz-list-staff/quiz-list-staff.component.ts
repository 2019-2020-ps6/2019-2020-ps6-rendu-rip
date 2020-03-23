import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-list-staff',
  templateUrl: './quiz-list-staff.component.html',
  styleUrls: ['./quiz-list-staff.component.scss']
})
export class QuizListStaffComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
  }

  ngOnInit() {
  }

  quizSelected(selected: boolean) {
    console.log('event received from child:', selected);
  }
  
  deleteQuiz(quiz: Quiz) {
    console.log('event deleted from child:', quiz.name);
    this.quizService.deleteQuiz(quiz);
  }
}
