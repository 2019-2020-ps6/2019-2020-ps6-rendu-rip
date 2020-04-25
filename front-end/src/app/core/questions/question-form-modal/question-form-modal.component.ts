import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Form, FormArray, FormGroup } from '@angular/forms';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { Img } from 'src/models/image.model';
import { QuizService } from 'src/services/quiz.service';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-question-form-modal',
  templateUrl: './question-form-modal.component.html',
  styleUrls: ['./question-form-modal.component.scss']
})
export class QuestionFormModalComponent implements OnInit {

  @Input() quiz: Quiz;
  
  questionForm: FormGroup;

  imageTemporaire: Img = {} as Img;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, public imageService: ImageService) {
    this.initializeQuestionForm();
  }

  ngOnInit() {}

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['']
    });
  }

  reset(){
    this.questionForm.reset();
    this.imageTemporaire = {} as Img;
  }

  saveQuestion() {
    const questionToSave: Question = this.questionForm.getRawValue() as Question;
    questionToSave.quizId = this.quiz.id;
    if(this.quizService.questionInvalid(questionToSave))return;
    if(this.imageTemporaire.name){
      this.quizService.addQuestionWithImage(this.quiz.id, questionToSave, this.imageService.imageFillIn(this.imageTemporaire));
    }
    else {
      this.quizService.addQuestion(this.quiz.id, questionToSave);
    }
    this.reset();
  }
}
