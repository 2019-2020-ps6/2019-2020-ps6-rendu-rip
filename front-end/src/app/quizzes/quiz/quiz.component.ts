import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { DomSanitizer } from '@angular/platform-browser';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;
  img64: string;

  @Output()
  quizSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private sanitizer: DomSanitizer, public quizService : QuizService) {}

  ngOnInit() {
    if(!this.quiz.image) this.img64 = this.quizService.imageByDefault();
    else this.img64 = this.quiz.image;
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
