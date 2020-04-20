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
  
  image: Img;
  imageNameAns: string;
  imagePreviewAns: string;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public imageService: ImageService) {}

  ngOnInit() {
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
    this.answerForm = this.formBuilder.group({
      value: [''],
      isCorrect: false,
    });
  }

  submitAnswer() {
    const answerToSave: Answer = this.answerForm.getRawValue() as Answer;
    answerToSave.questionId = this.question.id;
    if(!answerToSave.value && !this.imagePreviewAns) { 
      window.alert("Veuillez mettre une réponse ou une image")
      return
    }

    if(this.imagePreviewAns){
      let imgToSave: Img = this.imgFillIn();
      console.log("Answer: saving with image...");
      this.quizService.addAnswerWithImage(this.quiz.id, this.question.id, answerToSave, imgToSave);
    }
    else{
      this.quizService.addAnswer(this.question.quizId, this.question.id, answerToSave);
    }
    this.resetAns();
  }


  cancelAnswer() {
    this.answerForm.reset();
    this.answerAdded.emit(false);
  }
/*
  rightAnswerPresent() {
    this.question.answers.forEach(element => {
      if (element.isCorrect === true) {
        this.aRightAnswerIsAlreadyPresent = true;
      }
    });
  }*/

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
        console.log(this.imageNameAns);
      };
    }
  }



  getImgSrcAns() {
    if(this.imagePreviewAns) return this.imageService.sanitize(this.imagePreviewAns); 
    return this.imageService.sanitize(this.image.url); 
  }

}
