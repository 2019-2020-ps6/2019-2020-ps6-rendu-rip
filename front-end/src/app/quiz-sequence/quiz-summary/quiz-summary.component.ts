import { Component, OnInit } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-quiz-summary',
  templateUrl: './quiz-summary.component.html',
  styleUrls: ['./quiz-summary.component.scss']
})
export class QuizSummaryComponent implements OnInit {
  quiz : Quiz;
  questions: Question[] = [];
  currentQuestion : Question;
  TIME_OUT_DISPLAY_RIGHT_ANSWER: number = 5000; 

  image: Img;

  private timerDisplayRightAnswer: any;

  constructor(private route: ActivatedRoute, public quizService: QuizService, public imageService: ImageService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      if(quiz.questions) this.questions = quiz.questions.map(e => ({ ... e }));
      this.questions.reverse();
      this.nextQuestion();
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  nextQuestion(){
    this.stop(this.timerDisplayRightAnswer);
    if(this.questions.length>0){
      this.currentQuestion = this.questions.pop();
      this.loadImage();
      this.timerDisplayRightAnswer = this.startTimerDisplayRightAnswer();
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

  getImgSrc() { return this.imageService.sanitize(this.image.url) }

}

