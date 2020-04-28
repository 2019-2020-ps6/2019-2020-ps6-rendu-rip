import { Component, OnInit} from '@angular/core';
import { Question } from '../../../../models/Question.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../../models/image.model';
import { ImageService } from 'src/services/image.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from 'src/services/modal.service';



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
    
  constructor(private modalService : ModalService, private location: Location, private route: ActivatedRoute, public formBuilder: FormBuilder, public quizService: QuizService, public imageService: ImageService) {}

  ngOnInit() {
    this.quizService.quizSelected$.subscribe(() => this.load());
    this.load();
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  load(){
    this.image =  {} as Img;
    const quizId = this.route.snapshot.paramMap.get('id');
    const questionId = this.route.snapshot.paramMap.get('questionId');
    this.quizService.loadQuiz(quizId,this.quiz);
    this.quizService.loadQuestionAndImage(this.question,this.image, quizId,questionId)//pas d'image par défaut et -1 si image supprimée
  }

  allIsLoaded(){//si il n'y a pas de question ou quelle est chargée
    return this.quiz.id && this.question.id && (this.image.url||(!this.question.imageId || this.question.imageId===this.imageService.imageRemovedId))
  }

  resetAll(){
    this.resetAll$.next(true);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  invalid(){
    return this.quizService.answersInvalid(this.question)
  }

}