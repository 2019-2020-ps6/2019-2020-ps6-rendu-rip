import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
//import { SafeUrl } from '@angular/platform-browser';
import { ThemeService } from 'src/services/theme.service';

import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})

export class EditQuizComponent implements OnInit {
  quiz: Quiz;
  quizForm: FormGroup;
  editionMode: Boolean;
  showThemeForm: Boolean;

  modalOptions:NgbModalOptions;

  //already existing
  image: Img;

  imagesList: Img[] = []

  //form

  tmpImgDBId: string;
  tmpImgUrl: string;

  imgDBId: string;
  imgName: string;
  imgUrl: string;
  public THEME_LIST : string[];
  private themeBtnTxt: string;
  private themeBtnTxtInit: string = "Autre..."; 
  private themeBtnTxtShow: string = "Annuler"; 

  constructor( private modalService: NgbModal, private route: ActivatedRoute,
    public imageService: ImageService, public quizService: QuizService, 
    public formBuilder: FormBuilder, public themeService : ThemeService) {
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
      imageService.loadAllQuizImages(this.imagesList);
    }

  ngOnInit() {
    const id = this.quiz? this.quiz.id : this.route.snapshot.paramMap.get('id');
    if(this.quiz) {
      console.log("YYYEEEEPP!");
    }
    const newQuiz = id==null;
    this.quizService.quizSelected$.subscribe((quiz) => this.onQuizSelected(quiz));
    if(newQuiz) {
      this.initQuizForm();
    }
    else {//new quiz
      //this.quizService.quizSelected$.subscribe((quiz) => this.onQuizSelected(quiz));
      this.quizService.setSelectedQuiz(id);
    }
    this.editionMode = newQuiz;
    this.showThemeForm = false;
    this.themeBtnTxt = this.themeBtnTxtInit;
    this.imgUrl = null;
    this.themeService.themes$.subscribe((themes) =>{
      this.THEME_LIST =[];
      for(var i =0 ; i<themes.length;i++) this.THEME_LIST.push(themes[i].name)
    });
    this.imgDBId = null;
  }

  private onQuizSelected(quiz: Quiz) {
    this.quiz = quiz;
    this.loadImage();
  }

  //default image if no imgId in Quiz
  loadImage(){
    this.image = {} as Img;
    const id = this.quiz.imageId;
    if(id != null) {
      console.log(id)
      this.imageService.loadQuizImage(this.image, id);
    }
  }

  initQuizForm() {
    if(this.quiz == null) {
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
    this.editionMode = true;
  }

  reset(){
    this.quizForm.reset();
    this.editionMode = false;
    this.showThemeForm = false;
    this.imgUrl = null;
    this.quizForm = null;
    this.imgDBId = null;
  }

  resetBlank(){
    this.quizForm.reset();
    /*this.editionMode = true;
    this.showThemeForm = true;*/
    this.imgUrl = null;
    //this.quizForm = null;
  }

  updateQuiz() {
    const quizToSave: Quiz = this.quizFillIn();
    if(!quizToSave)return;
    const imgToSave: Img = this.imgFillIn();
    const newTxt = this.txtHasChanged(quizToSave);
    const newImg = this.imgHasChanged(imgToSave);
    //sans changement d'image
    if(this.imgDBId!=null || newTxt && !newImg) {//update quiz
      if(this.imgDBId != null) quizToSave.imageId = this.imgDBId.toString();
      this.quizService.updateQuiz(quizToSave);
    }//avec image
    else if(newImg) {
      //in any case: create image + update quiz
      console.log("heo")
      this.quizService.updateQuizWithImage(quizToSave, imgToSave);
    }
    this.reset();
  }

  saveQuiz() {
    let quizToSave: Quiz = this.quizFillIn();
    if(this.imgDBId != null) {
      quizToSave.imageId = this.imgDBId.toString();
      this.quizService.addQuiz(quizToSave);
    }
    else {
      if(!quizToSave) return;
      if(this.imgUrl){
        let imgToSave: Img = this.imgFillIn();
        console.log("Quiz: save with image...");
        this.quizService.addQuizWithImage(quizToSave, imgToSave);
      }
      else{
        console.log("Quiz: save...");
        this.quizService.addQuiz(quizToSave);
      }
    }
    this.reset();
  }

  txtHasChanged(quiz: Quiz): boolean {
    return quiz.name !== this.quiz.name || quiz.theme !== this.quiz.theme;
  }

  imgHasChanged(img: Img): boolean {
    return img.url && img.url !== this.image.url;
  }

  quizFillIn(): Quiz {
    const formValues: Quiz = this.quizForm.getRawValue() as Quiz;
    let quiz: Quiz = {} as Quiz;
    if(!formValues.name) {
      window.alert("Veuillez donner un nom au quiz")
      return null;
    }
    else if(!formValues.theme){
      window.alert("Veuillez donner un thème au quiz")
      return null;
    }
    quiz.name = formValues.name;
    quiz.theme = formValues.theme;
    quiz.creationDate = new Date();
    if(this.quiz != null) {
      quiz.id = this.quiz.id;
      if(this.quiz.imageId) quiz.imageId = this.quiz.imageId;
    }
    return quiz;
  }

  imgFillIn(): Img {
    let image = {} as Img;
    image.name = this.imgName;
    image.url = this.imgUrl;
    return image;
  }

  onChangeFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgName = file.name + " " + file.type;
        this.imgUrl = 'data:image;base64,' + (reader.result as string).split(',')[1];
        //(<string>reader.result).split or (reader.result as string).split
        console.log(this.imgName);
      };
      this.imgDBId = null;
    }
  }

  onChangeUrl(url: string){
    this.imgName = "image web";
    this.imgUrl = url;
    console.log(this.imgName);
    console.log(this.imgUrl);
    this.imgDBId = null;
  }

  displayImage() { return this.imageService.sanitize(this.imgUrl? this.imgUrl : this.image.url); }
  
  switchShowTheme() {
    this.showThemeForm = !this.showThemeForm; 
    this.themeBtnTxt = this.showThemeForm? this.themeBtnTxtShow : this.themeBtnTxtInit;
  }

  getThemeBtnTxt(): string { return this.themeBtnTxt; }

  open(content) {
    this.modalService.open(content, this.modalOptions);//.result.then();
  }

  getImgSrc(image: Img) { return this.imageService.sanitize(image.url) }

  onImgClicked(modal, id: string, url: string) {
    this.tmpImgDBId = id;
    this.tmpImgUrl = url;
    this.saveImgFromDB(modal);
  }

  saveImgFromDB(modal) {
    modal.close();
    if(this.tmpImgDBId != null && this.tmpImgUrl != null) {
      this.imgDBId = this.tmpImgDBId;
      this.imgUrl = this.tmpImgUrl;
    }
  }
}
