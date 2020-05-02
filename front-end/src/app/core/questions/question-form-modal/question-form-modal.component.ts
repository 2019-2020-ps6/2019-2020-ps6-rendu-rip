import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { Img } from 'src/models/image.model';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-question-form-modal',
  templateUrl: './question-form-modal.component.html',
  styleUrls: ['./question-form-modal.component.scss']
})
export class QuestionFormModalComponent implements OnInit {

  @Input() 
  quiz: Quiz;
  @Input()
  question : Question;
  @Input()
  image: Img;
  @Output()
  quitForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  questionForm: FormGroup;

  imageTmp: Img = {} as Img;

  constructor(public formBuilder: FormBuilder, public globalService: GlobalService) {
  }

  ngOnInit() {
    this.initImageTmp();
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    if(!this.question){
      this.questionForm = this.formBuilder.group({
        label: ['']
      });
    }
    else{
      this.questionForm = this.formBuilder.group({
        label: [this.question.label]
      });
    }
  }

  initImageTmp(){
    if(this.image) this.imageTmp = this.globalService.imageFillIn(this.image);
    else this.imageTmp = {} as Img;
  }

  reset(){
    this.questionForm.reset();
    this.initImageTmp();
    this.initializeQuestionForm();
    this.quitForm.emit(false);
  }

  addNewImage(){
    if(this.globalService.isRemoved(this.imageTmp.id)) return false
    if(this.imageTmp.type===this.globalService.defaultType) return false;
    if(this.imageTmp.type===this.globalService.dataBaseType)return false;
    return (this.imageTmp.url && (!this.image || this.image.url !== this.imageTmp.url))
  }

  addOrUpdateQuestion() {
    const questionToSave: Question = this.questionForm.getRawValue() as Question;
    if(this.question)questionToSave.id = this.question.id;
    questionToSave.quizId = this.quiz.id;
    if(this.globalService.questionInvalid(questionToSave))return;
    if(this.addNewImage()){
      if(this.question) this.globalService.updateQuestionWithImage(this.quiz.id, questionToSave, this.globalService.imageFillIn(this.imageTmp));
      else this.globalService.addQuestionWithImage(this.quiz.id,questionToSave, this.globalService.imageFillIn(this.imageTmp));
    }
    else {
      if(this.globalService.isRemoved(this.imageTmp.id)) questionToSave.imageId = this.imageTmp.id;
      else if(this.imageTmp.id) questionToSave.imageId = this.imageTmp.id.toString();
      if(this.question)this.globalService.updateQuestion(this.quiz.id,questionToSave);
      else this.globalService.addQuestion(this.quiz.id,questionToSave);
    } 
    this.reset();
    this.quitForm.emit(false);
  }

  sizeInput(){
    if(!this.question) return 20;
    else if (this.question.label.length>40) return 40;
    else return this.question.label.length;
  }
}
