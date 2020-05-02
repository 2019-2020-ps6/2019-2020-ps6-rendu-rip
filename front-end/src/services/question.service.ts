import { Injectable } from '@angular/core';
import { httpOptionsBase } from '../configs/server.config';
import { HttpClient} from '@angular/common/http';

import { Question } from '../models/question.model';
import { Img } from 'src/models/image.model';
import { QuizService } from './quiz.service';
import { ImageService } from './image.service';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

  private httpOptions = httpOptionsBase;
  
  /*private questions: Question[];
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);
  public questionSelected$: Subject<Question> = new Subject();*/

  constructor(private http: HttpClient) {}

  loadQuestion(question : Question, url: string) {
    this.http.get<Question>(url, this.httpOptions).subscribe(qu => {
      question.id       = qu.id;
      question.label    = qu.label;
      question.quizId   = qu.quizId;
      question.imageId  = qu.imageId;
      question.answers  = qu.answers;
    });
  }

  loadQuestionAndImage(imageService: ImageService, name: string, url: string, question : Question, image : Img) {
    this.http.get<Question>(url, this.httpOptions).subscribe(qu => {
      name              = qu.label;//for header
      question.id       = qu.id;
      question.imageId  = qu.imageId;
      question.label    = qu.label;
      question.quizId   = qu.quizId;
      question.answers  = qu.answers;
      if(qu.imageId) imageService.loadQuestionImage(image, qu.imageId);
    });
  }

  addQuestion(quizService: QuizService, url: string, question: Question) {
    this.http.post<Question>(url, question, this.httpOptions).subscribe((qu) => {
      quizService.setSelectedQuiz(qu.quizId);//quizId);
      quizService.setQuizzesFromUrl();
    });
  }

  addQuestionWithImage(quizService: QuizService, url: string, question: Question, urlImg: string, image: Img) {
    this.http.post<Img>(urlImg, image, this.httpOptions).subscribe(img => {
      question.imageId = img.id;//(img.id).toString();
      this.addQuestion(quizService, url, question);//met à jour observable
    });
  }

  updateQuestion(quizService: QuizService, url: string, question: Question) {
    this.http.put<Question>(url, question, this.httpOptions).subscribe((qu) => {
      quizService.setSelectedQuiz(qu.quizId);
      quizService.setQuizzesFromUrl();
    });
  }

  updateQuestionWithImage(quizService: QuizService, url: string, question: Question, urlImg: string, image: Img){
    this.http.post<Img>(urlImg, image, this.httpOptions).subscribe(img => {
      question.imageId = (img.id).toString();
      this.updateQuestion(quizService, url, question);//met à jour observable
    });
  }

  //quizId needed? --> delete return question deleted??? or not?...
  deleteQuestion(quizService: QuizService, url:string, quizId: string) {
    this.http.delete<Question>(url, this.httpOptions).subscribe(() => {
      quizService.setSelectedQuiz(quizId);
      quizService.setQuizzesFromUrl();
    });
  }

  questionInvalid(question: Question): boolean{
    if(!question.label) {
      window.alert("Veuillez mettre une question")
      return true;
    }
    return false;
  }
}
