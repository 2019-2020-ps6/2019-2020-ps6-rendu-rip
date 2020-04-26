import { Component, OnInit} from '@angular/core';
import { Question } from '../../../../models/Question.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../../models/image.model';
import { ImageService } from 'src/services/image.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from 'src/services/modal.service';



@Component({
    selector: 'app-question-view',
    templateUrl: './question-view.component.html',
    styleUrls: ['./question-view.component.scss']
  })
  
  export class QuestionViewComponent implements OnInit {

    showForm: boolean;

    public saveAll$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
    public resetAll$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
    question: Question;
    quiz: Quiz;
    image: Img = {} as Img;
    
  constructor(private modalService : ModalService, private http: HttpClient, private location: Location, private route: ActivatedRoute, public formBuilder: FormBuilder, public quizService: QuizService, public imageService: ImageService) {}

  ngOnInit() {
    this.quizService.quizSelected$.subscribe(() => this.loadAll());
    this.loadAll();
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }


  loadAll(){
    const quizId = this.route.snapshot.paramMap.get('id');
    const questionId = this.route.snapshot.paramMap.get('questionId');
    let quizurl = `${this.quizService.quizUrl}/${quizId}`;
    this.http.get<Quiz>(quizurl, this.quizService.httpOptions).subscribe((quiz)=>{
        let questionurl = `${this.quizService.quizUrl}/${quiz.id}/${'questions'}/${questionId}`;
        this.quiz = quiz;
        this.http.get<Question>(questionurl, this.quizService.httpOptions).subscribe((question)=>{
            this.question = question;
            this.imageService.loadQuestionImage(this.image,question.imageId)
        })
    });
}

  submitAll() {
    this.saveAll$.next(true);
  } 


  resetAll(){
    this.resetAll$.next(true);
  }
  
  switchShowForm(showForm :boolean){
    this.showForm = showForm;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}