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
  currentQuestion : Question;
  TIME_OUT_VALUE: number = 5000; // 10000 ms == 10s

  private timer: NodeJS.Timer;

  constructor(private route: ActivatedRoute, public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      if(quiz.questions) this.questions = quiz.questions.map(e => ({ ... e }));
      this.nextQuestion();
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  nextQuestion(){
    this.stop(this.timer);
    if(this.questions.length>0){
      this.currentQuestion = this.questions.pop();
      this.timer = this.startTimer();
    }
  }

  //passage automatique à la question suivante après avoir lu la réponse
  startTimer = () => setTimeout(() => this.nextQuestion(), this.TIME_OUT_VALUE);

  //to stop timer and clear treatment
  stop = (timer: NodeJS.Timer) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

}

