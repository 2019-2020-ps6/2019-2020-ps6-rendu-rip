import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { Img } from '../../../models/image.model';
import { DomSanitizer } from '@angular/platform-browser';
import { QuizService } from 'src/services/quiz.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;
  image: Img;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, public quizService : QuizService) {}

  ngOnInit() {
    //if(!this.quiz.image)
    this.image = {} as Img;
    if(this.quiz.image == null){
      const dflt_img_path = '/images/default/';
      const id = "1";
      const url = this.quizService.getServerUrl() + dflt_img_path + id;
      this.http.get<Img>(url).subscribe((img) => {
        console.log("Quiz: dflt image charging...");
        this.image.url = img.url;
      });
    }
    else{
      console.log("Quiz: image assignement");
      this.image.url = this.quiz.image;
    }
  }

  selectQuiz() {
    this.quizSelected.emit(true);
  }
  
  deleteQuiz() {
    this.quizDeleted.emit(this.quiz);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  
}
