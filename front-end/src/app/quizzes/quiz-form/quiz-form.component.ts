import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Img } from 'src/models/image.model';

import { map, mergeMap } from 'rxjs/operators';

//maybe pas beau de le mettre ici mais... plus simple^^ (pour sauvegarde image)
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})

export class QuizFormComponent implements OnInit {

  public quizForm: FormGroup;
  public THEME_LIST: String[];

  imageName: string;
  imagePreview: string;

  private quizToCreate: Quiz;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, 
    private sanitizer: DomSanitizer, private http: HttpClient) {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
      //image: ['']
    });
    this.THEME_LIST= ["Sport","Actor","Autres"];
  }
  
  ngOnInit() {
    this.quizToCreate = {} as Quiz;
  }

  reset(){
    this.quizForm.reset()
    this.quizToCreate = {} as Quiz;
    this.imagePreview = null;
    this.imageName = null;
  }

  addQuiz() {
    let quiz: Quiz = this.quizFillIn();
    if(this.imagePreview){
      console.log("Quiz: save with image...");
      this.saveWithImage(quiz);
    }
    else{
      console.log("Quiz: save...");
      this.quizService.addQuiz(this.quizToCreate);
    }
    this.reset();
  }

  quizFillIn(): Quiz {
    const formValues: Quiz = this.quizForm.getRawValue() as Quiz;
    this.quizToCreate.name = (formValues.name)? formValues.name : 'Sans nom';
    this.quizToCreate.theme = (formValues.theme)? formValues.theme : 'Autres';
    this.quizToCreate.creationDate = new Date();
    return this.quizToCreate;
    //quizToCreate.questions = [];
  }

  saveWithImage(quiz: Quiz) {
    //let quiz: Quiz = this.quizFillIn();
    let imgToSave = {} as Img;
    imgToSave.name = this.imageName;
    imgToSave.url = this.imagePreview;
    const url = this.quizService.getServerUrl() + '/images/quizzes';
    //const quizUrl = this.quizService.getServerUrl() + '/quizzes';
    
    //chained requests
    this.http.post<Img>(url, imgToSave, this.quizService.getHttpOptions()).subscribe(img =>{
      quiz.imageId = (img.id).toString(); //: Quiz = this.quizFillIn();
      console.log("quiz filled in map");
      console.log(quiz);
      this.quizService.addQuiz(quiz);//mieux car met à jour observable
      /*this.http.post<Quiz>(quizUrl, quiz, this.quizService.getHttpOptions()).subscribe(q =>{
        console.log("final res");
        console.log(q);
      });*/
    });
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

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
