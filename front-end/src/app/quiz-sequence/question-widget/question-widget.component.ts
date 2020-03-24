import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-question-widget',
  templateUrl: './question-widget.component.html',
  styleUrls: ['./question-widget.component.scss']
})
export class QuestionWidgetComponent implements OnInit {
  quiz : Quiz;
  questions: Question[];
  questionsDone: Question[] = [];
  
  currentQuestion : Question;

  /* @Output()
  answerSelected: EventEmitter<boolean> = new EventEmitter<boolean>();*/

  constructor(private route: ActivatedRoute, public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz
      if(quiz.questions) {
        this.questions = quiz.questions.map(e => ({ ... e }));
        console.log(this.questions);
        this.changeQuestion();
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  changeQuestion(){
    if(this.questions.length>0){
    this.currentQuestion = this.questions.pop();
    console.log(this.currentQuestion);
    this.questionsDone.push(this.currentQuestion);
    }
  }

  

}
