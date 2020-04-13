import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { ThemeService } from 'src/services/theme.service';
import { Theme } from 'src/models/theme.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})

export class QuizFormComponent implements OnInit {

  public quizForm: FormGroup;
  public THEME_LIST: string[];
  
  showThemeForm: boolean;
  imageName: string;
  imagePreview: string;

  private themeBtnTxt: string;
  private themeBtnTxtInit: string = "Autre..."; 
  private themeBtnTxtShow: string = "Annuler"; 

  constructor(public formBuilder: FormBuilder, public imageService: ImageService, public quizService: QuizService, public themeService: ThemeService) {
    // Form creation
  }
  
  ngOnInit() {
    this.showThemeForm = false;
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
    });
    this.THEME_LIST= [];
    this.themeService.themes$.subscribe((themes) =>{
        this.THEME_LIST =[];
        for(var i =0 ; i<themes.length;i++) this.THEME_LIST.push(themes[i].name)
    } );
    this.themeBtnTxt = this.themeBtnTxtInit;
  }

  reset(){
    this.quizForm.reset()
    this.imagePreview = null;
    this.imageName = null;
    this.showThemeForm = false;
  }

  addQuiz() {
    let quizToSave: Quiz = this.quizFillIn();
    if(!quizToSave) return;
    if(this.imagePreview){
      let imgToSave: Img = this.imgFillIn();
      console.log("Quiz: save with image...");
      this.quizService.addQuizWithImage(quizToSave, imgToSave);
    }
    else{
      console.log("Quiz: save...");
      this.quizService.addQuiz(quizToSave);
    }
    this.reset();
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
    return quiz;
  }

  imgFillIn(): Img {
    let image = {} as Img;
    image.name = this.imageName;
    image.url = this.imagePreview;
    return image;
  }
  
  onChangeFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageName = file.name + " " + file.type;
        this.imagePreview = 'data:image;base64,' + (reader.result as string).split(',')[1];
        //(<string>reader.result).split or (reader.result as string).split
        console.log(this.imageName);
      };
    }
  }

  onChangeUrl(url: string){
    this.imageName = "image web";
    this.imagePreview = url;
    console.log(this.imageName);
    console.log(this.imagePreview);
  }

  //sanitize necessary otherwise throw security error
  displayImage() { return this.imageService.sanitize(this.imagePreview); }

  swapShowTheme() {
    this.showThemeForm = !this.showThemeForm; 
    this.themeBtnTxt = this.showThemeForm? this.themeBtnTxtShow : this.themeBtnTxtInit;
  }

  getThemeBtnTxt(): string { return this.themeBtnTxt; }
}
