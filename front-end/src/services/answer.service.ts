import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptionsBase } from '../configs/server.config';

import { Answer } from 'src/models/answer.model';
import { Img } from 'src/models/image.model';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})

export class AnswerService {

  httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  addAnswer(quizService: QuizService, url: string, quizId: string, answer: Answer) {
    this.http.post<Answer>(url, answer, this.httpOptions).subscribe(() => {
      quizService.setSelectedQuiz(quizId);
      quizService.setQuizzesFromUrl();
    });
  }

  addAnswerWithImage(quizService: QuizService, url: string, quizId: string, answer: Answer, urlImg: string, image: Img) {
    this.http.post<Img>(urlImg, image, this.httpOptions).subscribe(img => {
      answer.imageId = img.id;//(img.id).toString();
      this.addAnswer(quizService, url, quizId, answer);//met à jour observable
    });
  }

  updateAnswer(quizService: QuizService, url: string, quizId: string, answer: Answer) {
    this.http.put<Answer>(url, answer, this.httpOptions).subscribe(() => {
      quizService.setQuizzesFromUrl();
      quizService.setSelectedQuiz(quizId)
    });
  }

  updateAnswerWithImage(quizService: QuizService, url: string, quizId: string, answer: Answer, urlImg: string, image: Img){
    this.http.post<Img>(urlImg, image, this.httpOptions).subscribe(img => {
      answer.imageId = (img.id).toString();
      this.updateAnswer(quizService, url, quizId, answer);//met à jour observable
    });
  }

  deleteAnswer(quizService: QuizService, url: string, quizId: string) {
    this.http.delete<Answer>(url, this.httpOptions).subscribe(() => quizService.setSelectedQuiz(quizId));
  }


  nbCorrectAnswers(answers : Answer[]){
    var nbRightAnswers = 0
    answers.forEach(element => { if(element.isCorrect) nbRightAnswers++ })
    return nbRightAnswers
  }

  answersInvalid(answers: Answer[]): string {
    let errorMessage = "";
    if(answers == null || answers.length<2){
      errorMessage = "Attention: 2 réponses minimum requises"
      return errorMessage;
    }
    var rightAnswers = this.nbCorrectAnswers(answers)
    if(rightAnswers>1){
      errorMessage = "Erreur: 1 seule réponse correcte possible"// --> faire la verif avant d'enregistrer réponse
      // gérer autrement --> radio buttons
    }
    if(rightAnswers===0){
      errorMessage = "Attention: il n'y a aucune réponse correcte"
    }
    return errorMessage;
  }

  answerInvalid(answer : Answer, imageId : string): boolean {
    if(!answer.value && !(answer.imageId || imageId)) { 
      window.alert("Veuillez mettre à minima du texte ou une image")
      return true;
    }
    return false;
  }
}
