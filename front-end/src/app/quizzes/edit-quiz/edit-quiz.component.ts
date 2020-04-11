import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})

export class EditQuizComponent implements OnInit {
  quiz: Quiz;
  quizForm: FormGroup;
  editionMode: Boolean;

  //already existing
  image: Img;

  //form
  imgName: string;
  imgUrl: string;

  constructor(private route: ActivatedRoute, public imageService: ImageService, public quizService: QuizService, public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.quizService.quizSelected$.subscribe((quiz) => this.onQuizSelected(quiz));
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.editionMode = false;
  }

  private onQuizSelected(quiz: Quiz) {
    this.quiz = quiz;
    this.loadImage();
  }

  //default image if no imgId in Quiz
  loadImage(){
    this.image = {} as Img;
    const id = this.quiz.imageId;
    this.imageService.loadQuizImage(this.image, id);
  }

  private initQuizForm() {//par contre par quelle magie il y a pas besoin de ça ??
    if(this.quiz == null) console.log("Quiz: intiQuizForm ... got 'null'!!");
    this.quizForm = this.formBuilder.group({
      name: this.quiz.name,
      theme: this.quiz.theme
    });
    this.editionMode = true;
  }

  reset(){
    this.quizForm.reset();
    this.editionMode = false;
    this.imgUrl = null;
    this.quizForm = null;
  }

  updateQuiz() {
    const quizToSave: Quiz = this.quizFillIn();
    if(!quizToSave)return;
    const imgToSave: Img = this.imgFillIn();
    const newTxt = this.txtHasChanged(quizToSave);
    const newImg = this.imgHasChanged(imgToSave);
    //sans changement d'image
    if(newTxt && !newImg) {//update quiz
      this.quizService.updateQuiz(quizToSave);
    }//avec image
    else if(newImg) {
      //in any case: create image + update quiz
      this.quizService.updateQuizWithImage(quizToSave, imgToSave);
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
    quiz.id = this.quiz.id;
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
    if(this.quiz.imageId) quiz.imageId = this.quiz.imageId;
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
    }
  }

  displayImage() {
    return this.imageService.sanitize(this.imgUrl? this.imgUrl : this.image.url);
  }
}
