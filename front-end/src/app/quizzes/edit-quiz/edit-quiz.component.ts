import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})

export class EditQuizComponent implements OnInit {
 
  quiz: Quiz;
  image: Img = {} as Img;
  showQuizForm : boolean = false;

  constructor(private route: ActivatedRoute, public imageService: ImageService, public quizService: QuizService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.quizSelected$.subscribe((quiz) => this.onQuizSelected(quiz));
    this.quizService.setSelectedQuiz(id);
  }
  private onQuizSelected(quiz: Quiz) {
    this.quiz = quiz;
    this.loadImage();
  }
  loadImage(){
    this.image = {} as Img;
    const id = this.quiz.imageId;
    if(!id) return;
    this.imageService.loadQuizImage(this.image, id);
  }
  switchShowQuizForm(show : boolean){
    this.showQuizForm = show;
  }
}

