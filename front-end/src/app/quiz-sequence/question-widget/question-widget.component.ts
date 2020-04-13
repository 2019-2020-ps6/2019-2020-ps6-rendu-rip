import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { BehaviorSubject } from 'rxjs';
import { AnswerListWidgetComponent } from '../answer-list-widget/answer-list-widget.component';
import { Answer } from 'src/models/answer.model';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-question-widget',
  templateUrl: './question-widget.component.html',
  styleUrls: ['./question-widget.component.scss']
})

export class QuestionWidgetComponent implements OnInit {

  quiz : Quiz;
  questions: Question[];
  currentQuestion : Question;
  image: Img;

  @Output() showAnswer: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, public quizService: QuizService, public imageService: ImageService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      if(quiz.questions) {
        this.questions = quiz.questions.map(e => ({ ... e }));
        this.questions.reverse();
        this.changeQuestion();
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
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
    const id = this.currentQuestion.imageId;
    if(id!=null) this.imageService.loadQuestionImage(this.image, id);
  }

  getImgSrc() { return this.imageService.sanitize(this.image.url) }
}


