import { Component, OnInit } from '@angular/core';
import { Img } from 'src/models/image.model';
import { Location } from '@angular/common';
import { ModalService } from 'src/services/modal.service';
import { GlobalService } from 'src/services/global.service';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  headerTitle = "Galerie d'images"

  images: Img[] = []
  imageSelected : Img;

  isUsed: boolean = false;

  quizToDeleteImage : Quiz[] = [];
  questionToDeleteImage : Question[] = [];
  answerToDeleteImage : Answer[] = [];
  quizToAnswer : Quiz[] = [];//sert à connaitre l'id du quiz de l'answer qu'on récupère pour pouvoir faire un put sans load sa question (moche je suis d'accord)
  constructor(public modalService :ModalService, public globalService: GlobalService, 
    private location: Location) {
  }

  ngOnInit() {
    this.globalService.loadAllImgs(this.images);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  checkIfImageIsUsed(img: Img){
    this.imageSelected = img;
    this.globalService.checkIfImageIsUsed(img.id, this.quizToDeleteImage, this.questionToDeleteImage, this.answerToDeleteImage,this.quizToAnswer);
    this.isUsed = this.used();
    //this.used();
  }

  reset(){
    this.quizToDeleteImage = [];
    this.questionToDeleteImage = [];
    this.answerToDeleteImage = [];
    this.imageSelected = {} as Img;
  }

  used(): boolean {
    return this.quizToDeleteImage.length!==0 || this.questionToDeleteImage.length!==0 || this.answerToDeleteImage.length!==0;
  }

  deleteImg(img: Img) {
    this.imageSelected = img;
    this.globalService.deleteImage(img);
    this.isUsed = this.used();
    if(this.isUsed){
      let imgTmp = {} as Img;
      this.globalService.removeImg(imgTmp);
      for(let quiz of this.quizToDeleteImage){
        quiz.imageId = imgTmp.id;
        quiz.questions = undefined;//car du côté back, il n'y a pas cet attribut, il est construit à chaque get
        this.globalService.updateQuiz(quiz);
      }
      for(let question of this.questionToDeleteImage){
        question.imageId = imgTmp.id;
        question.answers = undefined;
        this.globalService.updateQuestion(question.quizId,question);
      }
      for(var i = 0; i<this.answerToDeleteImage.length;i++){
        this.answerToDeleteImage[i].imageId = imgTmp.id;  
        this.globalService.updateAnswer(this.quizToAnswer[i].id,this.answerToDeleteImage[i].questionId,this.answerToDeleteImage[i]);
      }
    }
    this.images.length = 0;
    this.globalService.loadAllImgs(this.images);
  }
}
