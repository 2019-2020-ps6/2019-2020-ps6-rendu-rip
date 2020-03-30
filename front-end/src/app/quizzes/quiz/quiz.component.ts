import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { Img } from '../../../models/image.model';
import { DomSanitizer } from '@angular/platform-browser';
import { QuizService } from 'src/services/quiz.service';

//maybe pas beau de le mettre ici mais... plus simple^^ (pour chargement image)
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
    this.loadImage();
  }

  //default image if no imgId in Quiz
  loadImage(){
    this.image = {} as Img;
    const id = this.quiz.imageId;
    const url = this.quizService.getServerUrl() 
      + "/images/" 
      + ((id == null)? "default/1" : "quizzes/" + id);
    this.http.get<Img>(url).subscribe((img) => {
      console.log("Quiz: image charging...");
      this.image.url = img.url;
    });
  }

  selectQuiz() {
    this.quizSelected.emit(true);
  }
  
  deleteQuiz() {
    this.quizDeleted.emit(this.quiz);
  }

  //bypass security --> sinon pb ne s'affiche pas...
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  
}
