import { Component, OnInit} from '@angular/core';
import { Question } from '../../../models/Question.model';
import { Answer } from '../../../models/answer.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';



@Component({
    selector: 'app-edit-question',
    templateUrl: './edit-question.component.html',
    styleUrls: ['./edit-question.component.scss']
  })
  
  export class EditQuestionComponent implements OnInit {

    showForm: boolean;
    errorMessage : String;
    questionForm: FormGroup;

    public saveAll$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
    public resetAll$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
    question: Question;
    quiz: Quiz;
    image: Img;
    imageNameUp: string;
    imagePreviewUp: string;

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
  getImgSrc() { return this.imageService.sanitize(this.image.url) }

  initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label : [this.question.label]
    });
  }
  submitQuestionLabel(){
    const questionToSave: Question = this.questionForm.getRawValue() as Question;
    questionToSave.quizId = this.quiz.id;
    questionToSave.id = this.question.id;
    if(this.imagePreviewUp){
      let imgToSave: Img = this.imgFillIn();
      console.log("Question: saving with image...");
      this.quizService.updateQuestionWithImage(this.quiz.id, questionToSave, imgToSave);
    }
    else if(!questionToSave.label) {
      window.alert("Veuillez mettre une question")
      return;
    }
    else{
      if(this.question.imageId) questionToSave.imageId = this.question.imageId;
      this.quizService.updateQuestion(this.quiz.id, questionToSave);
    }
  }
  submitAll() {
    this.submitQuestionLabel();
    this.saveAll$.next(true);
  } 
  
  imgFillIn(): Img {
    let image = {} as Img;
    image.name = this.imageNameUp;
    image.url = this.imagePreviewUp;
    return image;
  }

  onChangeFile(event) {
    let reader = new FileReader();
    console.log(this.imageNameUp);
    console.log("heo")
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageNameUp = file.name + " " + file.type;
        this.imagePreviewUp = 'data:image;base64,' + (reader.result as string).split(',')[1];
        console.log(this.imageNameUp);
      };
    }
  }

  cancelQuestionLabel() {
    this.questionForm.reset();
    this.initializeQuestionForm();
  }

  cancelImageLoading(){
    this.imagePreviewUp = null;
    this.imageNameUp = null;
  }

  resetAll(){
    this.cancelQuestionLabel();
    this.cancelImageLoading();
    this.showForm = false;
    this.resetAll$.next(true);
  }
  getImgSrcUp() {
    if(this.imagePreviewUp) return this.imageService.sanitize(this.imagePreviewUp); 
    if(this.image) return this.imageService.sanitize(this.image.url); 
  }
    
  

  switchShowForm(showForm :boolean){
    this.showForm = showForm;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  questionInvalid(){
    if(!this.question.answers|| this.question.answers.length==0){
      this.errorMessage = "Il n'y a pas de réponses possibles."
      //this.theQuestionIsInvalid.emit(true);
      return true;
    }
    var oneRightAnswer = 0
    this.question.answers.forEach(element => { if(element.isCorrect) oneRightAnswer++ })
    if(oneRightAnswer===0){
      this.errorMessage = "Il n'y a pas de réponse correcte."
      //this.theQuestionIsInvalid.emit(true);
      return true;
    }
    if(oneRightAnswer>1){
      this.errorMessage = "Il y a plus d'une réponse correcte."
      //this.theQuestionIsInvalid.emit(true);
      return true;
    }
    if(this.question.answers.length!=4){
      this.errorMessage = "Il faudrait 4 réponses."
      //this.theQuestionIsInvalid.emit(true);
      return true;
    }
  }
}