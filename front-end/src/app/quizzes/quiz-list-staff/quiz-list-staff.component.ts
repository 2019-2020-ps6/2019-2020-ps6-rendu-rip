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

  showQuizForm : boolean  = false;

  constructor(public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes) => this.quizList = quizzes);
  }

  ngOnInit() {}
  
  deleteQuiz(quiz: Quiz) { this.quizService.deleteQuiz(quiz); }

  switchShowQuizForm(show:boolean){
    this.showQuizForm = show;
  }
}
