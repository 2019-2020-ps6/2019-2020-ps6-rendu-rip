import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit {

  @Input() quiz: Quiz;
  @Input() question: Question;
  @Input() answer: Answer;

  @Output() answerAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  answerForm: FormGroup;
  
  image: Img;

  imageTemporaire : Img = {} as Img;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public imageService: ImageService) {}

  ngOnInit() {
    this.initializeAnswerForm();
    this.loadImage();
  }

  loadImage(){
    this.image = {} as Img;
    if(this.answer){
      const id = this.answer.imageId;
      if(id!=null) this.imageService.loadAnswerImage(this.image, id);
    }
  }

  private initializeAnswerForm() {
    this.answerForm = this.formBuilder.group({
      value: [''],
      isCorrect: false,
    });
  }

  submitAnswer() {
    const answerToSave: Answer = this.answerForm.getRawValue() as Answer;
    answerToSave.questionId = this.question.id;
    if(this.quizService.answerInvalid(answerToSave,this.imageTemporaire.url))return;
    if(this.imageTemporaire.url){
      this.quizService.addAnswerWithImage(this.quiz.id, this.question.id, answerToSave, this.imageService.imageFillIn(this.imageTemporaire));
    }
    else{
      this.quizService.addAnswer(this.question.quizId, this.question.id, answerToSave);
    }
    this.resetAns();
  }


  cancelAnswer() {
    this.answerForm.reset();
    this.answerAdded.emit(false);
  }

  resetAns(){
    this.answerForm.reset();
    this.imageTemporaire = {} as Img;
    this.answerAdded.emit(false);
  }

}
