import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
//import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss']
})

export class QuizViewComponent implements OnInit {
 
  headerTitle: string;
  quiz: Quiz;
  image: Img = {} as Img;

  constructor(private modalService: ModalService, private route: ActivatedRoute, public imageService: ImageService, public quizService: QuizService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.onQuizSelected(quiz);
      this.headerTitle = quiz.theme + " : " + quiz.name;
    });
    this.quizService.setSelectedQuiz(id);
  }

  private onQuizSelected(quiz: Quiz) {
    this.quiz = quiz;
    this.loadImage();
  }
  
  loadImage(){
    this.image = {} as Img;
    const id = this.quiz.imageId;//image par défaut si null
    this.imageService.loadQuizImage(this.image, id);
  }
}

