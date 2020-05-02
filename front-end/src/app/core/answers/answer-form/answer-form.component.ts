import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { Img } from '../../../../models/image.model';

import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit {

  @Input() quiz: Quiz;
  @Input() question: Question;
  @Input() answer : Answer;
  @Output() quitForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  answerForm: FormGroup;
  
  imageTmp : Img = {} as Img;
  image : Img = {} as Img;
  constructor(public formBuilder: FormBuilder, public globalService: GlobalService) {}

  ngOnInit() {
    this.initializeAnswerForm();
    this.loadImage();
  }

  private initializeAnswerForm() {
    if(!this.answer){
      this.answerForm = this.formBuilder.group({
        value: [''],
        isCorrect: false,
      });
    }
    else {
      const val = this.answer.value? this.answer.value : '';
      this.answerForm = this.formBuilder.group({
        value : [val],
        isCorrect: this.answer.isCorrect
      });
    }
  }

  initImageTmp(){
    if(this.image) this.imageTmp = this.globalService.imageFillIn(this.image);
    else this.imageTmp = {} as Img;
  }

  loadImage(){
    this.image = {} as Img;
    if(this.answer){
      const id = this.answer.imageId;
      if(id) {
        this.globalService.loadAnswerImage(this.image, id);
        this.globalService.loadAnswerImage(this.imageTmp,id);
      }
    }
  }

  allIsLoaded(){
    return this.answer; //|| (this.image.url || (!this.answer.imageId || this.answer.imageId===this.imageService.imageRemovedId));
  }

  submitAnswer() {
    let answerToSave: Answer = {} as Answer;
    const value = this.answerForm.getRawValue().value;
    answerToSave.isCorrect = this.answerForm.getRawValue().isCorrect;
    if(value!="") answerToSave.value = value;
    if(this.answer) answerToSave.id = this.answer.id;
    answerToSave.questionId = this.question.id;
    if(this.globalService.answerInvalid(answerToSave, this.imageTmp.url))return;
    if(this.addImage()){
      if(this.answer) this.globalService.updateAnswerWithImage(this.quiz.id,this.question.id,answerToSave,this.globalService.imageFillIn(this.imageTmp))
      else this.globalService.addAnswerWithImage(this.quiz.id, this.question.id, answerToSave, this.globalService.imageFillIn(this.imageTmp));
    }
    else{
      if(this.globalService.isRemoved(this.imageTmp.id)) answerToSave.imageId = this.imageTmp.id;
      else if(this.imageTmp.id) answerToSave.imageId = this.imageTmp.id.toString();
      if(this.answer) this.globalService.updateAnswer(this.question.quizId, this.question.id, answerToSave);
      else this.globalService.addAnswer(this.question.quizId, this.question.id, answerToSave);
    }
    this.reset();
  }

  reset(){
    this.answerForm.reset();
    this.initializeAnswerForm();
    this.initImageTmp();
    this.quitForm.emit(false);
  }

  addImage(){
    if(this.globalService.isRemoved(this.imageTmp.id) ||
    this.imageTmp.type===this.globalService.defaultType ||
    this.imageTmp.type===this.globalService.dataBaseType) return false;
    return (this.imageTmp.url && (!this.image || this.image.url !== this.imageTmp.url));
  }
  
  deleteAnswer() {
    if(this.answer) this.globalService.deleteAnswer(this.quiz.id, this.question.id, this.answer.id);
  }

  //Renvoi un id pour modals pour éviter le conflit
  setLabel(){
    return this.answer ? this.answer.id : "";
  }

  sizeInput(){
    if(!this.answer || !this.answer.value) return 20;
    else if (this.answer.value.length>40)return 40;
    else return this.answer.value.length;
  }
}
