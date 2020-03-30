import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

import { Quiz } from '../../../models/quiz.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Img } from 'src/models/image.model';

//maybe pas beau de le mettre ici mais... plus simple^^ (pour chargement image)
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  quiz: Quiz;
  quizForm: FormGroup;
  editionMode: Boolean = false;

  image: Img;
  imgUrl: string;

  constructor(private route: ActivatedRoute, public quizService: QuizService, private sanitizer: DomSanitizer, public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.quizService.quizSelected$.subscribe((quiz) => this.onQuizSelected(quiz));
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    //this.loadImage();
  }

  private onQuizSelected(quiz: Quiz) {
    this.quiz = quiz;
    this.initQuizForm();
    this.loadImage();
  }

  //default image if no imgId in Quiz
  loadImage(){
    this.image = {} as Img;
    const id = this.quiz.imageId;
    const url = this.quizService.getServerUrl() 
      + "/images/" 
      + ((id == null)? "default/1" : "quizzes/" + id);
    this.quizService.getHttpClient().get<Img>(url).subscribe((img) => {
      console.log("Quiz: image charging...");
      this.image.url = img.url;
    });
    this.imgUrl = this.image.url;
  }

  private initQuizForm() {
    if (this.quiz != null) {
      this.quizForm = this.formBuilder.group({
        name: this.quiz.name,
        theme: this.quiz.theme
      });
    } else {
      this.quizForm = this.formBuilder.group({
        name: "",
        theme: "Autres"
      });
    }
  }

  updateQuiz() {
    let quizUpdated: Quiz = this.quizForm.getRawValue() as Quiz;
    /*if(this.imgUrl!=null && this.image.url !== this.imgUrl) {
      const id = this.saveImage();
      quizUpdated.imageId = id;
    }*/
    this.quizService.updateQuiz(this.quiz, quizUpdated);
    this.editionMode = false;
  }

  /*saveImage(){
    let imgToSave = {} as Img;
    //imgToSave.name = this.ImageName;
    imgToSave.url = this.imgUrl;
    let idToRet;
    const url = this.quizService.getServerUrl() + "/images/quizzes";
    this.quizService.getHttpClient().post<Img>(url, imgToSave, this.quizService.getHttpOptions()).subscribe((img) => {
      console.log("Quiz: saving image...");
      idToRet = img.id;
    });
    return idToRet;
  }*/

  onChangeFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgUrl = 'data:image;base64,' + (reader.result as string).split(',')[1];
      };
    }
  }

  sanitize(url: string) {
    if(!url) url = this.image.url;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
