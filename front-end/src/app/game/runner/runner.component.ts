import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
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

  headerTitle: string;
  headerImage: Img;

  constructor(private route: ActivatedRoute, public quizService: QuizService, public imageService: ImageService, public attemptService: AttemptService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.headerTitle = this.quiz.name;
      this.loadHeaderImage();
      if(quiz.questions) {
        this.questions = quiz.questions.map(e => ({ ... e }));
        this.questions.reverse();
        if(this.quiz.random){
          this.quizService.shuffleArray(this.questions);
          this.questions.forEach(question => {
            this.quizService.shuffleArray(question.answers);
          });
        }
        this.initAttempt();
        this.changeQuestion();
      }
    });
  }

  loadHeaderImage() {
    this.headerImage = {} as Img;
    this.imageService.loadQuizImage(this.headerImage, this.quiz.imageId);
  }

  initAttempt() {
    this.currentAttempt = {} as Attempt;
    this.currentAttempt.playerId = this.route.snapshot.paramMap.get('id');
    //this.currentAttempt.quizId = this.quiz.id;
    this.currentAttempt.quiz = this.quiz;
    this.currentAttempt.date = new Date();
    this.currentAttempt.timeOuts = 0;
    this.currentAttempt.wrongAnswers = [];
    //this.currentAttempt.questions = [];
  }

  onTimeOut() {
    this.currentAttempt.timeOuts++;// += 1;
  }

  onWrongAnswer(wrongAnswer: Answer) {
    this.currentAttempt.wrongAnswers.push(wrongAnswer);
  }

  sendAttempt() {
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
    //this.currentAttempt.questions.push(this.currentQuestion);
    this.loadImage();
  }
  
  loadImage(){
    this.image = {} as Img;
    let id = null;
    if(this.currentQuestion) id = this.currentQuestion.imageId;
    if(id) this.imageService.loadQuestionImage(this.image, id);
  }
}

/*
playerId: Joi.number().required(),
  quizId: Joi.number().required(),
  date: Joi.string(),
  timeOuts: Joi.number().required(),
  quiz: Joi.any(),//Joi.object(Quiz.schema),//Quiz,//Joi.object(Quiz),
  questions: Joi.array(),//.items(Question),
  wrongAnswers: Joi.array()//.items(Answer) // .items(Joi.object(Answer))
*/