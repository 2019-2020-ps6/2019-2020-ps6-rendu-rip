import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../../models/image.model';
import { ImageService } from 'src/services/image.service';
import { ModalService } from 'src/services/modal.service';

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
  //a enlever
  gallery : Img[] = [];
  urlForm: FormGroup;
  constructor(private modalService: ModalService, public formBuilder: FormBuilder, public quizService: QuizService, public imageService: ImageService) {}

  ngOnInit() {
    this.imageService.loadAllImgs(this.gallery);
    this.initializeAnswerForm();
    this.loadImage();
    this.initUrlForm();
  }

  private initializeAnswerForm() {
    if(!this.answer){
      this.answerForm = this.formBuilder.group({
        value: [''],
        isCorrect: false,
      });
    }
    else {
      this.answerForm = this.formBuilder.group({
        value : [this.answer.value],
        isCorrect: this.answer.isCorrect
      });
    }
  }

  initImageTmp(){
    if(this.image) this.imageTmp = this.imageService.imageFillIn(this.image);
    else this.imageTmp = {} as Img;
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
    if(this.answer)answerToSave.id = this.answer.id;
    answerToSave.questionId = this.question.id;
    if(this.quizService.answerInvalid(answerToSave,this.imageTmp.url))return;
    if(this.addImage()){
      if(this.answer) this.quizService.updateAnswerWithImage(this.quiz.id,this.question.id,answerToSave,this.imageService.imageFillIn(this.imageTmp))
      else this.quizService.addAnswerWithImage(this.quiz.id, this.question.id, answerToSave, this.imageService.imageFillIn(this.imageTmp));
    }
    else{
      if(this.imageTmp.name===this.imageService.rmImg) answerToSave.imageId = "1";
      else if(this.imageTmp.id) answerToSave.imageId = this.imageTmp.id.toString();
      if(this.answer) this.quizService.updateAnswer(this.question.quizId, this.question.id, answerToSave);
      else this.quizService.addAnswer(this.question.quizId, this.question.id, answerToSave);
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
    if(this.imageTmp.name===this.imageService.rmImg)return false;
    if(this.imageTmp.type===this.imageService.dataBaseType)return false;
    return (this.imageTmp.url && (!this.image || this.image.url !== this.imageTmp.url))
  }
  
  rmImg() {
    this.imageTmp = {} as Img;
    this.imageTmp.name = this.imageService.rmImg;  
  }

  deleteAnswer() {
    if(this.answer) this.quizService.deleteAnswer(this.quiz, this.question, this.answer);
  }

  //Trucs modals pour éviter le conflit
  setLabel(){
    return this.answer ? this.answer.id : "";
  }
  onImgClicked(modal, imageTmp : Img, image : Img){
    this.imageService.onImgClicked(modal, imageTmp,image);
    //this.imageSelected.emit(this.imageTmp);
}

onUrlClicked(modal) {
  this.imageService.onUrlClicked(modal,this.imageTmp,this.urlForm.getRawValue().url)
  this.urlForm.reset();
}
initUrlForm() {
  this.urlForm = this.formBuilder.group({url: "",});
} 

sizeInput(){
  if(!this.answer) return 20;
  else if (this.answer.value.length>40)return 40;
  else return this.answer.value.length;
}
}
