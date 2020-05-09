import { Component, OnInit} from '@angular/core';
import { Question } from '../../../../models/Question.model';
import { FormBuilder } from '@angular/forms';
import { Quiz } from 'src/models/quiz.model';
import { Img } from '../../../../models/image.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from 'src/services/modal.service';
import { Answer } from 'src/models/answer.model';
import { GlobalService } from 'src/services/global.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
    selector: 'app-question-view',
    templateUrl: './question-view.component.html',
    styleUrls: ['./question-view.component.scss']
  })  
export class QuestionViewComponent implements OnInit {

  public resetAll$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
  question: Question = {} as Question;
  quiz: Quiz = {} as Quiz;
  image: Img = {} as Img;
    
  headerTitle: string;

  constructor(private modalService : ModalService, private location: Location, 
    private route: ActivatedRoute, public formBuilder: FormBuilder, 
    public globalService: GlobalService, private quizService : QuizService ) {}

    
  ngOnInit() {
    this.quizService.quizSelected$.subscribe(() => this.load());
    this.load();
    const quizId = this.route.snapshot.paramMap.get('id');
    this.globalService.setSelectedQuiz(quizId);
  }

  setHeader(){
    if(this.question.label) return this.question.label;
  }

  
  load(){
    this.image =  {} as Img;
    const quizId = this.route.snapshot.paramMap.get('id');
    const questionId = this.route.snapshot.paramMap.get('questionId');
    this.globalService.loadQuiz(quizId, this.quiz);
    this.globalService.loadQuestionAndImage(quizId, questionId, this.headerTitle, this.question, this.image)//pas d'image par défaut et -1 si image supprimée
  }

  allIsLoaded() {//si il n'y a pas de question ou qu'elle est chargée
    return this.quiz.id && this.question.id && (this.image.url ||
      (!this.question.imageId || this.question.imageId===this.globalService.imageRemovedId));
  }

  resetAll(){
    this.resetAll$.next(true);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  invalid(){
    return this.globalService.answersInvalid(this.question.answers)
  }

  deleteAnswer(answer: Answer) {
    if(answer) this.globalService.deleteAnswer(this.quiz.id, this.question.id, answer.id);
  }
}