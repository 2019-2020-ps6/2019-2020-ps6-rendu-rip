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



@Component({
    selector: 'app-question-view',
    templateUrl: './question-view.component.html',
    styleUrls: ['./question-view.component.scss']
  })
  
  export class QuestionViewComponent implements OnInit {

    showForm: boolean;
    questionForm: FormGroup;

    public saveAll$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
    public resetAll$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
    question: Question;
    quiz: Quiz;
    image: Img;
    
    imageTemporaire : Img = {} as Img;

  constructor(private http: HttpClient, private location: Location, private route: ActivatedRoute, public formBuilder: FormBuilder, public quizService: QuizService, public imageService: ImageService) {}

  ngOnInit() {
    this.quizService.quizSelected$.subscribe(() => this.loadAll());
    this.loadAll();
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }
  private onceAllIsLoaded() {
    this.initializeQuestionForm();
    }


  loadAll(){
    const quizId = this.route.snapshot.paramMap.get('id');
    const questionId = this.route.snapshot.paramMap.get('questionId');
    let quizurl = `${this.quizService.quizUrl}/${quizId}`;
    console.log(quizurl)
    this.http.get<Quiz>(quizurl, this.quizService.httpOptions).subscribe((quiz)=>{
        let questionurl = `${this.quizService.quizUrl}/${quiz.id}/${'questions'}/${questionId}`;
        console.log(questionurl);
        this.quiz = quiz;
        this.http.get<Question>(questionurl, this.quizService.httpOptions).subscribe((question)=>{
            this.question = question;
            if(question.imageId){
              let imageurl  = `http://localhost:9428/api/images/question/${question.imageId}`;
              console.log(imageurl)
              this.http.get<Img>(imageurl, this.quizService.httpOptions).subscribe((image) =>{
                this.image = image;
                this.onceAllIsLoaded();
              })
            }
            else{
              this.onceAllIsLoaded();
            }
        })
    });
}

  initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label : [this.question.label]
    });
  }

  submitQuestionLabel(){
    const questionToSave: Question = this.questionForm.getRawValue() as Question;
    questionToSave.quizId = this.quiz.id;
    questionToSave.id = this.question.id;
    if(this.imageTemporaire.name){
      this.quizService.updateQuestionWithImage(this.quiz.id, questionToSave, this.imageService.imageFillIn(this.imageTemporaire));
    }
    else if(this.quizService.questionInvalid(questionToSave))return;
    else{
      if(this.question.imageId) questionToSave.imageId = this.question.imageId;
      this.quizService.updateQuestion(this.quiz.id, questionToSave);
    }
  }
  submitAll() {
    this.submitQuestionLabel();
    this.saveAll$.next(true);
  } 

  cancelImageLoading(){
    this.imageTemporaire = {} as Img;
  }
  cancelQuestionLabel() {
    this.questionForm.reset();
    this.initializeQuestionForm();
  }


  resetAll(){
    this.cancelQuestionLabel();
    this.cancelImageLoading();
    this.showForm = false;
    this.resetAll$.next(true);
  }
  
  switchShowForm(showForm :boolean){
    this.showForm = showForm;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}