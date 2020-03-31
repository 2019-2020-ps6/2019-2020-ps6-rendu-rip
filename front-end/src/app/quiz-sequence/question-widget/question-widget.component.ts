import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { BehaviorSubject } from 'rxjs';
import { AnswerListWidgetComponent } from '../answer-list-widget/answer-list-widget.component';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-question-widget',
  templateUrl: './question-widget.component.html',
  styleUrls: ['./question-widget.component.scss']
})
export class QuestionWidgetComponent implements OnInit {
  quiz : Quiz;
  questions: Question[];
  // questionsDone: Question[] = [];
  
  currentQuestion : Question;
  noMoreQuestion: boolean = false;

  /* @Output()
  answerSelected: EventEmitter<boolean> = new EventEmitter<boolean>();*/

  constructor(private route: ActivatedRoute, public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz
      if(quiz.questions) {
        this.questions = quiz.questions.map(e => ({ ... e }));
        this.changeQuestion();
      }
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  onSelectedAnswer(answerSelected: Answer) {
    
    //console.log(answerSelected);
    this.changeQuestion();
  }

  done():boolean{
      return this.noMoreQuestion;
  }


  changeQuestion(){
    if(this.questions.length>0){
    this.currentQuestion = this.questions.pop();
    // this.questionsDone.push(this.currentQuestion);
    }
    else if (this.questions.length==0){
      this.noMoreQuestion = true;
    }
  }

  

}
