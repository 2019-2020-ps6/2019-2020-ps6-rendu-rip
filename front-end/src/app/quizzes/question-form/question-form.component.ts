import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Form, FormArray, FormGroup } from '@angular/forms';
import { Question } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { Img } from 'src/models/image.model';
//import { QuestionService } from 'src/services/question.service';
import { QuizService } from 'src/services/quiz.service';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input() quiz: Quiz;
  
  questionForm: FormGroup;

  imageName: string;
  imagePreview: string;

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
    this.imagePreview = null;
    this.imageName = null;
  }

  saveQuestion() {
    const questionToSave: Question = this.questionForm.getRawValue() as Question;
    questionToSave.quizId = this.quiz.id;
    if(!questionToSave.label) {
      window.alert("Veuillez mettre une question")
      return;
    }
    if(this.imagePreview){
      let imgToSave: Img = this.imgFillIn();
      console.log("Question: saving with image...");
      this.quizService.addQuestionWithImage(this.quiz.id, questionToSave, imgToSave);
    }
    else {
      this.quizService.addQuestion(this.quiz.id, questionToSave);
    }
    this.reset();
  }

  imgFillIn(): Img {
    let image = {} as Img;
    image.name = this.imageName;
    image.url = this.imagePreview;
    return image;
  }

  onChangeFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageName = file.name + " " + file.type;
        this.imagePreview = 'data:image;base64,' + (reader.result as string).split(',')[1];
        //(<string>reader.result).split or (reader.result as string).split
        console.log(this.imageName);
      };
    }
  }

  onChangeUrl(url: string){
    this.imageName = "image web";
    this.imagePreview = url;
    console.log(this.imageName);
    console.log(this.imagePreview);
  }

  getImgSrc() { return this.imageService.sanitize(this.imagePreview); }
}
