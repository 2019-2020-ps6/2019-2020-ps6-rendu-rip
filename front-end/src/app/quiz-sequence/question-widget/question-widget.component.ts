import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { QUIZ_LIST } from 'src/mocks/quiz-list.mock';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-question-widget',
  templateUrl: './question-widget.component.html',
  styleUrls: ['./question-widget.component.scss']
})
export class QuestionWidgetComponent implements OnInit {


  questions: Question[];

  /* @Output()
  answerSelected: EventEmitter<boolean> = new EventEmitter<boolean>();*/


  quizSelected: Quiz;

  constructor(private route: ActivatedRoute, public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quizSelected = quiz
      if(quiz.questions) this.questions = quiz.questions;
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }
  /*
  selectAnswer(answer : Answer) {
   this.answerSelected = answer;
  }
  */

}
