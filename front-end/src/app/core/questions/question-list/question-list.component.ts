import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  @Input()
  quiz: Quiz;

  constructor(public quizService: QuizService) {
  }
  
  ngOnInit() {
  }
}
