import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/Question.model';
import { Answer } from '../../../models/answer.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
    selector: 'app-edit-question',
    templateUrl: './edit-question.component.html',
    styleUrls: ['./edit-question.component.scss']
  })
  
  export class EditQuestionComponent implements OnInit {
   
    answerSelected: Answer;
    show: boolean;
    showFormQuestion : boolean;
    errorMessage : String;
    questionForm: FormGroup;


    question: Question;
    quiz: Quiz;
    image: Img;
    imageNameUp: string;
    imagePreviewUp: string;

  constructor(private location: Location, private route: ActivatedRoute, public formBuilder: FormBuilder, public quizService: QuizService, public imageService: ImageService) {}

  ngOnInit() {
    this.quizService.quizSelected$.subscribe((quiz) => this.onQuizSelected(quiz));
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }
  private onQuizSelected(quiz: Quiz) {
    this.quiz = quiz;
    this.loadQuestion();
    this.loadImage();
  }

  loadImage(){
    this.image = {} as Img;
    const id = this.question.imageId;
    if(id) this.imageService.loadQuestionImage(this.image, id);
  }
  loadQuestion(){
    this.question = {} as Question;
    const id = this.route.snapshot.paramMap.get('questionId');
    this.quizService.loadQuestion(this.question,this.quiz.id,id);
  }

  //deleteQuestion() { this.questionDeleted.emit(this.question) }

  getImgSrc() { return this.imageService.sanitize(this.image.url) }

  initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label : [this.question.label]
    });
  }

  submitQuestionLabel() {
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
    this.resetUp();
  } 

  resetUp(){
    this.questionForm.reset();
    this.showFormQuestion = false;
    this.imagePreviewUp = null;
    this.imageNameUp = null;
  }
  
  imgFillIn(): Img {
    let image = {} as Img;
    image.name = this.imageNameUp;
    image.url = this.imagePreviewUp;
    return image;
  }

  onChangeFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageNameUp = file.name + " " + file.type;
        this.imagePreviewUp = 'data:image;base64,' + (reader.result as string).split(',')[1];
        //(<string>reader.result).split or (reader.result as string).split
        console.log(this.imageNameUp);
      };
    }
  }

  getImgSrcUp() {
    if(this.imagePreviewUp) return this.imageService.sanitize(this.imagePreviewUp); 
    return this.imageService.sanitize(this.image.url); 
  }
    
    
  //////////////////////////////////////////////////////////////:


  cancelQuestionLabel() {
    this.questionForm.reset();
    this.showFormQuestion=false;
  }
  supprAnswer(answer: Answer) {
    this.quizService.deleteAnswer(this.quiz, this.question, answer);
  }
  
  editAnswer(answer: Answer) {
    this.answerSelected = answer;
    this.switchShow(true);
  }

  editLabelQuestion(){
    this.initializeQuestionForm();
    this.showFormQuestion =true;
  }

  createAnswer() {
    this.switchShow(true);
  }

  reset(show: boolean) {
    this.switchShow(show);
    this.answerSelected = null;
  }
  
  switchShow(show: boolean) {
    this.show = show;
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
    var oneRightAnswer = false
    this.question.answers.forEach(element => { if(element.isCorrect) oneRightAnswer = true })
    if(!oneRightAnswer){
      this.errorMessage = "Il n'y a pas de réponse correcte."
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