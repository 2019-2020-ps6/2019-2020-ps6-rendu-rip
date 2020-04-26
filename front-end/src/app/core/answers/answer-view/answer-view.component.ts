import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../../models/image.model';
import { ImageService } from 'src/services/image.service';
import { Router } from '@angular/router';
import { Answer } from 'src/models/answer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuestionViewComponent } from '../../questions/question-view/question-view.component';

@Component({
  selector: 'app-answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.scss']
})

export class AnswerViewComponent implements OnInit {

  @Input() answer: Answer;
  @Input() question : Question;
  @Input() quiz : Quiz;
  
  image: Img;
  imageTmp : Img = {} as Img;
  answerForm : FormGroup;

  constructor(public questionView: QuestionViewComponent, public formBuilder : FormBuilder, public quizService: QuizService, public imageService: ImageService, public router: Router) {
}


  ngOnInit() {
    /*this.initializeAnswerForm();
    this.loadImage();
    this.questionView.resetAll$.subscribe((obj) => {
        if(obj===true)this.cancelAnswer()
    })
    this.questionView.saveAll$.subscribe((obj)=>{
        if(obj===true)this.submitAnswer()
    })
    */
}

/*
  initializeAnswerForm() {
    this.answerForm = this.formBuilder.group({
      value : [this.answer.value],
      isCorrect: this.answer.isCorrect
    });
  }

  loadImage(){
    this.image = {} as Img;
    if(this.answer){
      const id = this.answer.imageId;
      if(id) this.imageService.loadAnswerImage(this.image, id);
    }
  }

  submitAnswer() {
    const answerToSave: Answer = this.answerForm.getRawValue() as Answer;
    answerToSave.questionId = this.question.id;
    answerToSave.id = this.answer.id;
    if(this.quizService.answerInvalid(answerToSave,this.imageTmp.url))return;
    if(this.imageTmp.url){
        this.quizService.updateAnswerWithImage(this.quiz.id, this.question.id, answerToSave, this.imageService.imageFillIn(this.imageTmp));
      }
    else{
        this.quizService.updateAnswer(this.question.quizId, this.question.id, answerToSave);
    }    
}

  cancelAnswer() {
    this.answerForm.reset();
    this.imageTmp = {} as Img;
    this.initializeAnswerForm();
  }

  deleteAnswer() {
    this.quizService.deleteAnswer(this.quiz, this.question, this.answer);
  }*/
}