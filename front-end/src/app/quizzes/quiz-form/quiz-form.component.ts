import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})

export class QuizFormComponent implements OnInit {

  public quizForm: FormGroup;
  // tslint:disable-next-line: ban-types
  public THEME_LIST: String[];

  ImageName: string;
  ImagePreview: string

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private sanitizer: DomSanitizer) {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: ['']
    });
    this.THEME_LIST= ["Sport","Actor","Autres"];
  }

  ngOnInit() {
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    if(!quizToCreate.theme)quizToCreate.theme = 'Autres';
    if(!quizToCreate.name)quizToCreate.name = 'Pas de nom de quiz';
    quizToCreate.creationDate = new Date();
    if(!this.ImagePreview)quizToCreate.image=this.quizService.imageByDefault()
    else quizToCreate.image = this.ImagePreview;
    quizToCreate.questions =  [];
    //console.log('Add quiz: ', quizToCreate);
    console.log(quizToCreate.image);
    this.quizService.addQuiz(quizToCreate);
    this.quizForm.reset()
    this.ImagePreview = null;
    this.ImageName = null;

  }

  onChangeFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ImageName = file.name + " " + file.type;
        this.ImagePreview = 'data:image;base64,' + (reader.result as string).split(',')[1];
        //(<string>reader.result).split
        //or
        //(reader.result as string).split
        //console.log(this.ImageName);
        //console.log(this.ImagePreview);
      };
    }
  }
  sanitize(url: string) {
    //return url;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
