import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { ThemeService } from 'src/services/theme.service';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quiz-form-modal',
  templateUrl: './quiz-form-modal.component.html',
  styleUrls: ['./quiz-form-modal.component.scss']
})

export class QuizFormModalComponent implements OnInit {

  @Input()
  quiz: Quiz;
  @Input()
  image: Img;

  gallery : Img[] = [];

  quizForm: FormGroup;
  urlForm: FormGroup;
  showThemeForm: boolean = false;
  
  imageTmp: Img = {} as Img;


  modalOptions:NgbModalOptions;
  @Output()
  quitForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  public THEME_LIST : string[];

  constructor( private modalService: NgbModal, public imageService: ImageService, public quizService: QuizService, 
    public formBuilder: FormBuilder, public themeService : ThemeService) {
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
    }

  ngOnInit() {
    this.imageService.loadAllImgs(this.gallery);
    this.initQuizForm();
    this.initUrlForm();
    this.themeService.themes$.subscribe((themes) =>{
      this.THEME_LIST =[];
      for(var i =0 ; i<themes.length;i++) this.THEME_LIST.push(themes[i].name)
    });
  }

  initUrlForm() {
    this.urlForm = this.formBuilder.group({url: "",});
  }
  initQuizForm() {
    if(!this.quiz) {
      this.quizForm = this.formBuilder.group({
        name: "",
        theme: ""
      });
      this.quizForm.reset();
    }
    else {
      this.quizForm = this.formBuilder.group({
        name: this.quiz.name,
        theme: this.quiz.theme
      });
    }
  }

  reset(){
    this.quizForm.reset();
    this.imageTmp = {} as Img;
    this.initQuizForm();
    this.quitForm.emit(false);
  }

  addOrUpdateQuiz() {
    let quizToSave: Quiz = this.quizFillIn();
    if(this.quizService.quizInvalid(quizToSave))return;
    if(this.imageTmp.id == this.imageService.rmImg && 
        this.imageTmp.url == this.imageService.rmImg 
      || this.imageTmp.type === this.imageService.dataBaseType 
      || !this.imageTmp.url) {
      if(this.imageTmp.id) quizToSave.imageId = this.imageTmp.id.toString();
      if(this.quiz) {
        if(this.imageTmp.id == this.imageService.rmImg && 
          this.imageTmp.url == this.imageService.rmImg) quizToSave.imageId = "";//empty --> bad request...
        this.quizService.updateQuiz(quizToSave);
      }
      else this.quizService.addQuiz(quizToSave);
    }
    else {
      if(this.quiz)this.quizService.updateQuizWithImage(quizToSave,this.imageService.imageFillIn(this.imageTmp));
      else this.quizService.addQuizWithImage(quizToSave, this.imageService.imageFillIn(this.imageTmp));
    }
    if(!this.quiz)this.reset();
    this.quitForm.emit(false);
  }

  quizFillIn() {
    const quizToSave: Quiz = this.quizForm.getRawValue() as Quiz;
    quizToSave.creationDate = new Date();
    if(this.quiz) quizToSave.id = this.quiz.id;
    return quizToSave;
  }

  onUrlClicked(modal) {
    this.imageService.onUrlClicked(modal,this.imageTmp,this.urlForm.getRawValue().url)
  }
  
  open(content) {
    this.modalService.open(content, this.modalOptions);
  }

  switchShowThemeForm(show : boolean){
    this.showThemeForm = show;
  }

  rmImg(img: Img) {
    this.imageTmp.id = this.imageService.rmImg;
    this.imageTmp.url = this.imageService.rmImg;
  }
}
