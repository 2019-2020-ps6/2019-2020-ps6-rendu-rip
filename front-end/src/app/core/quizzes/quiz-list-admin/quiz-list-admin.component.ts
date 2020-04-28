import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-quiz-list-admin',
  templateUrl: './quiz-list-admin.component.html',
  styleUrls: ['./quiz-list-admin.component.scss']
})
export class QuizListAdminComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(private modalService: ModalService, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes) => this.quizList = quizzes);
  }

  ngOnInit() {}
  
  deleteQuiz(quiz: Quiz) { this.quizService.deleteQuiz(quiz); }

}
