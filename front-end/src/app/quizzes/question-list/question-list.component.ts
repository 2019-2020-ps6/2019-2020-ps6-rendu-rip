import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';
import { QuestionService } from 'src/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  @Input()
  public questionList: Question[];
  constructor(public questionService: QuestionService) {
    this.questionService.questions$.subscribe((question) => this.questionList = question);
  }
  ngOnInit() {
    this.questionService.setQuestions(this.questionList);
  }

  deleteQuestion(question: Question) {
    this.questionService.deleteQuestion(question);
  }

}
