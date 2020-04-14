import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit {

  @Input() quiz: Quiz;
  @Input() question: Question;
  @Input() answer: Answer;

  @Output() answerAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  answerForm: FormGroup;
  aRightAnswerIsAlreadyPresent : boolean = false;
  
  image: Img;
  imageNameAns: string;
  imagePreviewAns: string;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public imageService: ImageService) {}

  ngOnInit() {
    this.rightAnswerPresent();
    this.initializeAnswerForm();
    this.loadImage();
  }

  loadImage(){
    this.image = {} as Img;
    if(this.answer){
      const id = this.answer.imageId;
      if(id!=null) this.imageService.loadAnswerImage(this.image, id);
    }
  }

  private initializeAnswerForm() {
    if (this.answer != null) {
      this.answerForm = this.formBuilder.group({
        value: [this.answer.value],
        isCorrect: this.answer.isCorrect,
      });
    } else {
      this.answerForm = this.formBuilder.group({
        value: [''],
        isCorrect: false,
      });
    }
  }

  submitAnswer() {
    const answerToSave: Answer = this.answerForm.getRawValue() as Answer;
    answerToSave.questionId = this.question.id;
    if(this.answer==null){
      if(this.imagePreviewAns){
        let imgToSave: Img = this.imgFillIn();
        console.log("Answer: saving with image...");
        this.quizService.addAnswerWithImage(this.quiz.id, this.question.id, answerToSave, imgToSave);
      }
      else if(!answerToSave.value) { 
        window.alert("Veuillez mettre une réponse.")
        return
      }
      else{
        this.quizService.addAnswer(this.question.quizId, this.question.id, answerToSave);
      }
    }
    else{//update
      answerToSave.id = this.answer.id;
      if(this.imagePreviewAns){
        let imgToSave: Img = this.imgFillIn();
        console.log("Answer: saving with image...");
        this.quizService.updateAnswerWithImage(this.quiz.id, this.question.id, answerToSave, imgToSave);
      }
      else if(!answerToSave.value) { 
        window.alert("Veuillez mettre une réponse.")
        return
      }
      else{
        if(this.answer.imageId) answerToSave.imageId = this.question.imageId;
        this.quizService.updateAnswer(this.question.quizId, this.question.id, answerToSave);
      }
    }
    this.resetAns();

    /*if (this.answer == null) {
      if (!answerToSave.isCorrect) { answerToSave.isCorrect = false; }
      //if (!answerToCreate.value) { answerToCreate.value = 'Aucune idée'; }
      this.quizService.addAnswer(this.question.quizId, this.question.id, answerToSave);
    } 
    else {
      for (let i = 0; i < this.question.answers.length; i++) {
        if (this.question.answers[i] == this.answer) {
          answerToSave.id = this.answer.id;
          this.quizService.updateAnswer(this.question.quizId, this.question.id, answerToSave);
        }
      }
    }*/
  }


  cancelAnswer() {
    this.answerForm.reset();
    this.answerAdded.emit(false);
  }

  rightAnswerPresent() {
    this.question.answers.forEach(element => {
      if (element.isCorrect === true) {
        this.aRightAnswerIsAlreadyPresent = true;
      }
    });
  }

  isSetToRight(): boolean{
    if(this.answer==null) return false;
    return this.answer.isCorrect;
  }

  resetAns(){
    this.answerForm.reset();
    this.imagePreviewAns = null;
    this.imageNameAns = null;
    this.answerAdded.emit(false);
  }
  
  imgFillIn(): Img {
    let image = {} as Img;
    image.name = this.imageNameAns;
    image.url = this.imagePreviewAns;
    return image;
  }

  onChangeFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageNameAns = file.name + " " + file.type;
        this.imagePreviewAns = 'data:image;base64,' + (reader.result as string).split(',')[1];
        //(<string>reader.result).split or (reader.result as string).split
        console.log(this.imageNameAns);
      };
    }
  }



  getImgSrcAns() {
    if(this.imagePreviewAns) return this.imageService.sanitize(this.imagePreviewAns); 
    return this.imageService.sanitize(this.image.url); 
  }

}
