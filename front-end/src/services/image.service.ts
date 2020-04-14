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
    this.http.get<Img>(`${serverUrl}/images/${path}`, this.httpOptions).subscribe(img => {
      console.log(`${log}: charging image - ${img.name}`);
      image.id = img.id;
      image.name = img.name;
      image.url = img.url;
    });
  }

  loadAllQuizImages(images: Img[]){
    //const url = `${serverUrl}/images/quiz`;
    this.loadAllImages(images, 'quiz', 'Quiz');
    /*this.http.get<Img[]>(url).subscribe(imgs => {
      imgs.forEach(i => { 
        const ind = images.length;
        images[ind] = i as Img;
        console.log("QuizBD: adding image - " + i.name);
      });
    });*/
  }

  loadQuizImage(image: Img, id: string){
    //const path = ;//`${serverUrl}/images/${id == null? 'default/1' : 'quiz/' + id}`;
    this.loadImage(image, `${id == null? 'default/1' : 'quiz/' + id}`, 'Quiz');
    /*this.http.get<Img>(url).subscribe(img => {
      console.log("Quiz: charging image - " + img.name);
      image.id = img.id;
      image.name = img.name;
      image.url = img.url;
    });*/
  }

  loadQuestionImage(image: Img, id: string){
    //const path = ;//`${serverUrl}/images/question/${id}`;
    this.loadImage(image, `question/${id}`, 'Question');
  }

  loadAnswerImage(image: Img, id: string){
    //const path = ;//`${serverUrl}/images/answer/${id}`;
    this.loadImage(image, `answer/${id}`, 'Answer');
  }

  loadUserImage(image: Img, id: string){
    //const path = ;//`${serverUrl}/images/${id == null? '1' : 'user/' + id}`;
    this.loadImage(image,`${id == null? '1' : 'user/' + id}`, 'User');
    /*this.http.get<Img>(url).subscribe(img => {
      console.log("User: charging image - " + img.name);
      image.id = img.id;
      image.name = img.name;
      image.url = img.url;
    });*/
  }

  //bypass security --> sinon pb ne s'affiche pas...
  sanitize(url: string) { return this.sanitizer.bypassSecurityTrustUrl(url); }

  deleteQuizImage(image: Img) { this.http.delete<Img>(`${serverUrl}/images/quiz/${image.id}`, this.httpOptions)
    .subscribe(() => console.log("Image: deletion...")); }

  /*createQuizImageAndSaveQuiz(imgToSave: Img, quiz: Quiz, quizService: QuizService) {
    const url = serverUrl + '/images/quiz';
    //chained requests
    this.http.post<Img>(url, imgToSave, this.httpOptions).subscribe(img => {
      quiz.imageId = (img.id).toString();
      console.log("Quiz: saving...");
      console.log(quiz);
      quizService.addQuiz(quiz);//met à jour observable
    });
  }*/
}