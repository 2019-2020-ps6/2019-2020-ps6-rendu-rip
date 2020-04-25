import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { BehaviorSubject } from 'rxjs';
import { AnswerListWidgetComponent } from '../answer-list-widget/answer-list-widget.component';
import { Answer } from 'src/models/answer.model';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { Attempt } from 'src/models/attempt.model';
import { AttemptService } from 'src/services/attempt.service';


@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.scss']
})

export class RunnerComponent implements OnInit {

  quiz : Quiz;
  questions: Question[];
  currentQuestion : Question;
  image: Img;
  currentAttempt: Attempt;

  @Output() showAnswer: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, public quizService: QuizService, public imageService: ImageService, public attemptService: AttemptService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      if(quiz.questions) {
        this.questions = quiz.questions.map(e => ({ ... e }));
        this.questions.reverse();
        this.changeQuestion();

        this.initAttempt();
      }
    });

  }

  initAttempt() {
    this.currentAttempt = {} as Attempt;
    this.currentAttempt.playerId = this.route.snapshot.paramMap.get('id');
    this.currentAttempt.quizId = this.quiz.id;
    this.currentAttempt.date = new Date();
    this.currentAttempt.timeOuts = 0;
    this.currentAttempt.wrongAnswers = [];
  }

  onTimeOut() {
    this.currentAttempt.timeOuts += 1;
    console.log("ET 1 time out UN ..");
  }

  onWrongAnswer(wrongAnswer: Answer) {
    this.currentAttempt.wrongAnswers.push(wrongAnswer);
    console.log("Poin poin poin poin poiiiin ..");
    console.log(wrongAnswer);
  }

  sendAttempt() {
    console.log("sending attempt ..");
    console.log(this.currentAttempt);
    this.attemptService.sendAttempt(this.currentAttempt);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(id);
  }

  onSelectedAnswer = (answerSelected: Answer) => console.log("");

  onNext = () => this.changeQuestion();

  changeQuestion = () => {
    this.currentQuestion = this.questions.pop();
    this.loadImage();
  }
  
  loadImage(){
    this.image = {} as Img;
    let id = null;
    if(this.currentQuestion) id = this.currentQuestion.imageId;
    if(id) this.imageService.loadQuestionImage(this.image, id);
  }
}


