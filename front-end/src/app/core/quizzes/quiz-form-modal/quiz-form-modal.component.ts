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
  
  imageTemporaire: Img = {} as Img;


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
    this.imageService.loadAllQuizImages(this.gallery);
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
    this.imageTemporaire = {} as Img;
    this.initQuizForm();
    this.quitForm.emit(false);
  }

  addOrUpdateQuiz() {
    let quizToSave: Quiz = this.quizFillIn();
    if(this.quizService.quizInvalid(quizToSave))return;
    if(this.imageTemporaire.type === this.imageService.dataBaseType || !this.imageTemporaire.url) {
      if(this.imageTemporaire.id) quizToSave.imageId = this.imageTemporaire.id.toString();
      if(this.quiz)this.quizService.updateQuiz(quizToSave);
      else this.quizService.addQuiz(quizToSave);
    }
    else {
      if(this.quiz)this.quizService.updateQuizWithImage(quizToSave,this.imageService.imageFillIn(this.imageTemporaire));
      else this.quizService.addQuizWithImage(quizToSave, this.imageService.imageFillIn(this.imageTemporaire));
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
    this.imageService.onUrlClicked(modal,this.imageTemporaire,this.urlForm.getRawValue().url)
  }
  
  open(content) {
    this.modalService.open(content, this.modalOptions);
  }

  switchShowThemeForm(show : boolean){
    this.showThemeForm = show;
  }
 
}
