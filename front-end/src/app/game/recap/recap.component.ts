import { Component, OnInit } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})
export class RecapComponent implements OnInit {
  quiz : Quiz;
  questions: Question[] = [];
  currentQuestion : Question;
  TIME_OUT_DISPLAY_RIGHT_ANSWER: number = 10000; 

  image: Img;

  private timerDisplayRightAnswer: any;

  headerTitle = "Récapitulatif - "

  constructor(private router : Router, private route: ActivatedRoute, public quizService: QuizService, public imageService: ImageService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.headerTitle += quiz.name;
      if(quiz.questions) this.questions = quiz.questions.map(e => ({ ... e }));
      this.questions.reverse();
      this.nextQuestion();
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(id);
  }

  nextQuestion(){
    this.stop(this.timerDisplayRightAnswer);
    if(this.questions.length > 0){
      this.currentQuestion = this.questions.pop();
      this.loadImage();
      this.timerDisplayRightAnswer = this.startTimerDisplayRightAnswer();
    }
    else {//fin
      this.router.navigate(['../end'], { relativeTo: this.route });
      //routerLink= "../end"
    }
  }

  //passage automatique à la question suivante après avoir lu la réponse
  startTimerDisplayRightAnswer = () => setTimeout(() => this.nextQuestion(), this.TIME_OUT_DISPLAY_RIGHT_ANSWER);

  //to stop timer and clear treatment
  stop = (timer: any) => {//NodeJS.Timer) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  loadImage(){
    this.image = {} as Img;
    const id = this.currentQuestion.imageId;
    if(id) this.imageService.loadQuestionImage(this.image, id);
  }
}

