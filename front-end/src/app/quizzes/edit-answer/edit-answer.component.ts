import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Img } from '../../../models/image.model';
import { ImageService } from 'src/services/image.service';
import { Router } from '@angular/router';
import { Answer } from 'src/models/answer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { EditQuestionComponent } from '../edit-question/edit-question.component';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.scss']
})
export class EditAnswerComponent implements OnInit {

  @Input() answer: Answer;
  @Input() question : Question;
  @Input() quiz : Quiz;
  
  image: Img;
  imageNameAns: string;
  imagePreviewAns: string;
  answerForm : FormGroup;

  constructor(public editQuestion: EditQuestionComponent, public formBuilder : FormBuilder, public quizService: QuizService, public imageService: ImageService, public router: Router) {
}


  ngOnInit() {
    this.initializeAnswerForm();
    this.loadImage();
    this.editQuestion.resetAll$.subscribe((obj) => {
        if(obj===true)this.cancelAnswer()
    })
    this.editQuestion.saveAll$.subscribe((obj)=>{
        if(obj===true)this.submitAnswer()
    })
}


  initializeAnswerForm() {
    this.answerForm = this.formBuilder.group({
      value : [this.answer.value],
      isCorrect: this.answer.isCorrect
    });
  }

  loadImage(){
    this.image = {} as Img;
    if(this.answer){
      const id = this.answer.imageId;
      if(id!=null) this.imageService.loadAnswerImage(this.image, id);
    }
  }
  
  imgFillIn(): Img {
    let image = {} as Img;
    image.name = this.imageNameAns;
    image.url = this.imagePreviewAns;
    return image;
  }

  submitAnswer() {
    const answerToSave: Answer = this.answerForm.getRawValue() as Answer;
    answerToSave.questionId = this.question.id;
    answerToSave.id = this.answer.id;
    if(this.imagePreviewAns){
        let imgToSave: Img = this.imgFillIn();
        this.quizService.updateAnswerWithImage(this.quiz.id, this.question.id, answerToSave, imgToSave);
      }
    else if(!answerToSave.value && !this.imagePreviewAns && !this.answer.imageId) { 
        window.alert("Veuillez mettre une réponse ou une image.")
    return
    }
    else{
        //if(this.answer.imageId) answerToSave.imageId = this.question.imageId; // ????
        this.quizService.updateAnswer(this.question.quizId, this.question.id, answerToSave);
    }    
}
  onChangeFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageNameAns = file.name + " " + file.type;
        this.imagePreviewAns = 'data:image;base64,' + (reader.result as string).split(',')[1];
      };
    }
  }

  cancelAnswer() {
    this.answerForm.reset();
    this.imagePreviewAns = null;
    this.imageNameAns = null;
    this.initializeAnswerForm();
  }

  getImgSrcAns() {
    if(this.imagePreviewAns) return this.imageService.sanitize(this.imagePreviewAns); 
    return this.imageService.sanitize(this.image.url); 
  }

  deleteAnswer() {
    this.quizService.deleteAnswer(this.quiz, this.question, this.answer);
  }

}