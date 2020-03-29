import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

import { Quiz } from '../../../models/quiz.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  quizSelected: Quiz;
  quizForm: FormGroup;
  editionMode: Boolean = false;

  imgAsString: string;

  constructor(private route: ActivatedRoute, public quizService: QuizService, private sanitizer: DomSanitizer, public formBuilder: FormBuilder) {
    
   }

  ngOnInit() {
    this.quizService.quizSelected$.subscribe((quiz) => this.onQuizSelected(quiz));
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  private onQuizSelected(quiz: Quiz) {
    this.quizSelected = quiz;
    this.initQuizForm();
  }

  private initQuizForm() {
    if (this.quizSelected != null) {
      this.quizForm = this.formBuilder.group({
        name: this.quizSelected.name,
        theme: this.quizSelected.theme
      });
    } else {
      this.quizForm = this.formBuilder.group({
        name: "",
        theme: "Autres"
      });
    }
  }

  updateQuiz() {
    let newNameAndTheme = this.quizForm.getRawValue() as {name: String, theme: String, image?: String};

    if (this.quizSelected.image !== this.imgAsString) {
      newNameAndTheme = {...newNameAndTheme, image: this.imgAsString};
    }

    this.quizService.updateQuiz(this.quizSelected,newNameAndTheme);
    this.editionMode = false;
  }

  onChangeFile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgAsString = 'data:image;base64,' + (reader.result as string).split(',')[1];
      };
    }
  }

  sanitize(url: string) {
    if(!url) url = this.quizService.imageByDefault();
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }





  /*getId(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.quizService.quizzes$.
    subscribe(quizzes => {
      let list = quizzes.filter(quiz => quiz.id.toString()==id.toString());
      if(list.length>0)this.quizSelected = list[0];
    }
    )
    console.log(this.quizSelected);
  }
  */
}
