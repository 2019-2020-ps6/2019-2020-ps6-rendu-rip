import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { DomSanitizer } from '@angular/platform-browser';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { Img } from 'src/models/image.model';
import { QuizService } from './quiz.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  private httpOptions = httpOptionsBase;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  public loadAllImgs(images: Img[]) {
    this.loadAllImages(images, "quiz", "")
    this.loadAllImages(images, "question", "")
    this.loadAllImages(images, "answer", "")
    this.loadAllImages(images, "user", "")
  }

  private loadAllImages(images: Img[], path: string, log: string){
    this.http.get<Img[]>( `${serverUrl}/images/${path}`, this.httpOptions).subscribe(imgs => {
      imgs.forEach(i => { 
        const ind = images.length;
        images[ind] = i as Img;
        console.log(`${log}BD: adding image - ${i.name}`);
      });
    });
  }

  private loadImage(image: Img, path: string, log: string){
    console.log(`${serverUrl}/images/${path}`)
    this.http.get<Img>(`${serverUrl}/images/${path}`, this.httpOptions).subscribe(img => {
      console.log(`${log}: charging image - ${img.name}`);
      image.id = img.id;
      image.name = img.name;
      image.url = img.url;
    });
  }

  loadAllQuizImages(images: Img[]){
    this.loadAllImages(images, 'quiz', 'Quiz');
  }

  loadQuizImage(image: Img, id: string){
    this.loadImage(image, `${id == null? 'default/1' : 'quiz/' + id}`, 'Quiz');
  }

  loadQuestionImage(image: Img, id: string){
    //const path = ;//`${serverUrl}/images/question/${id}`;
    console.log(id)
    this.loadImage(image, `question/${id}`, 'Question');
  }

  loadAnswerImage(image: Img, id: string){
    //const path = ;//`${serverUrl}/images/answer/${id}`;
    this.loadImage(image, `answer/${id}`, 'Answer');
  }

  loadUserImage(image: Img, id: string){
    this.loadImage(image,`${id == null? '1' : 'user/' + id}`, 'User');
  }

  sanitize(url: string) { return this.sanitizer.bypassSecurityTrustUrl(url); }

  deleteQuizImage(image: Img) { this.http.delete<Img>(`${serverUrl}/images/quiz/${image.id}`, this.httpOptions)
    .subscribe(() => console.log("Image: deletion...")); }


  takeImage(id : string, url:string, image: Img){
    image.id=id;
    image.url=url;
  }
}