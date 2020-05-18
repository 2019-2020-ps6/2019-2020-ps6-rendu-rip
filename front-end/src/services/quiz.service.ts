import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

import { Quiz } from '../models/quiz.model';
import { Img } from 'src/models/image.model';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  // private quizUrl = ' http://localhost:9428/api/quizzes';
  quizUrl = serverUrl + '/quizzes';
  httpOptions = httpOptionsBase;

  private quizzes: Quiz[];
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public quizSelected$: Subject<Quiz> = new Subject();

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  loadQuiz(quizId: string, output: Quiz) {
    const url = `${this.quizUrl}/${quizId}`;
    this.http.get<Quiz>(url).subscribe((quiz) => {
      output.id = quiz.id;
      output.name = quiz.name;
      output.creationDate = quiz.creationDate;
      output.questions = quiz.questions;
      output.theme = quiz.theme;
      output.imageId = quiz.imageId;
    });
  }

  loadQuizAndImage(imageService: ImageService, quizId: string, output: Quiz, image : Img ) {
    const url = `${this.quizUrl}/${quizId}`;
    this.http.get<Quiz>(url).subscribe((quiz) => {
      output.id = quiz.id;
      output.name = quiz.name;
      output.creationDate = quiz.creationDate;
      output.questions = quiz.questions;
      output.theme = quiz.theme;
      output.imageId = quiz.imageId;
      if(output.imageId) imageService.loadQuizImage(image,output.imageId);
    });
  }

  setQuizzes(quizzes: Quiz[]) {
    console.log(quizzes);
    this.quizzes = quizzes;
    this.quizzes$.next(this.quizzes);
  }

  setQuizzesFromUrl() { this.http.get<Quiz[]>(this.quizUrl).subscribe((quizzes) => this.setQuizzes(quizzes)); }

  setQuiz(quiz: Quiz){ this.quizSelected$.next(quiz); }
  
  setSelectedQuiz(quizId: string) {
    const url = `${this.quizUrl}/${quizId}`;
    this.setQuizzesFromUrl();
    this.http.get<Quiz>(url).subscribe((quiz) => this.setQuiz(quiz));
  }

  addQuiz(quiz: Quiz) { this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe((quiz) => {
    this.setQuizzesFromUrl();
    this.setSelectedQuiz(quiz.id);
  })};

  addQuizWithImage(quiz: Quiz, image: Img) {
    const url = `${serverUrl}/images/database`;
    //chained requests
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      quiz.imageId = (img.id).toString();
      this.addQuiz(quiz);//met à jour observable
    });
  }

  updateQuiz(quiz: Quiz) {
    const url = `${this.quizUrl}/${quiz.id}`;
    console.log(quiz)
    this.http.put<Quiz>(url, quiz, this.httpOptions).subscribe(quiz => {
      console.log(quiz)
      this.setSelectedQuiz(quiz.id);
      this.setQuizzesFromUrl();
    });
  }

  updateQuizWithImage(quiz: Quiz, image: Img) {
    const url = `${serverUrl}/images/database`;
    //chained requests
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      quiz.imageId = (img.id).toString();
      this.updateQuiz(quiz);//met à jour observable
    });
  }

  deleteQuiz(quiz: Quiz) {
    const url = `${this.quizUrl}/${quiz.id}`;
    this.http.delete<Quiz>(url, this.httpOptions).subscribe(() => {
      this.setQuizzesFromUrl();
    });
  }

  quizInvalid(quiz :Quiz): boolean{
    if(!quiz.name) {
      window.alert("Veuillez donner un nom au quiz")
      return true;
    }
    else if(!quiz.theme){
      window.alert("Veuillez donner un thème au quiz")
      return true;
    }
    return false;
  }

  areQuizAndQuestionsInvalid(quiz : Quiz): boolean {
    return !quiz || !quiz.questions || quiz.questions.length<1;
  }

  /* 
    * mélanger la contenue du tableau 'array'
   */
  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
}
