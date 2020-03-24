import { Component, OnInit } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-quiz-summary',
  templateUrl: './quiz-summary.component.html',
  styleUrls: ['./quiz-summary.component.scss']
})
export class QuizSummaryComponent implements OnInit {
  quiz : Quiz;
  questions: Question[] = [];
  currentQuestionToDisplay : Question;

  constructor(private route: ActivatedRoute, public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz
      if(quiz.questions) this.questions = quiz.questions.map(e => ({ ... e }));
      this.changeQuestionToDisplay();
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  changeQuestionToDisplay(){
    if(this.questions.length>0){
      this.currentQuestionToDisplay = this.questions.pop();
    }
  }
  

}

