import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { ModalService } from 'src/services/modal.service';
import { GlobalService } from 'src/services/global.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss']
})

export class QuizViewComponent implements OnInit {
 
  headerTitle: string;
  quiz: Quiz;
  image: Img = {} as Img;
  hidden : boolean = true;//"error" sometimes? dans console ("value changed after beeing checked") mais semble marcher en général/dernièrement plus de "error" donc OK
  private currentTab: string;

  constructor(private globalService : GlobalService, private modalService: ModalService, private location : Location, private route: ActivatedRoute, public imageService: ImageService, public quizService: QuizService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.onQuizSelected(quiz);
      this.headerTitle = quiz.name;
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

  switchHidden(hidden : boolean){
    this.hidden = hidden;
  }

  invalidMsg(){
    if(this.globalService.areQuizAndQuestionsInvalid(this.quiz)) return "Attention il n'y a pas de questions";
    if(this.hidden) return "Le quiz n'est actuellement visible par personne, \n vous pouvez changer cela en cliquant sur Modifier la visibilité";
  }

  isValid(): boolean {
    return this.quiz==undefined || this.quiz==null || !this.globalService.areQuizAndQuestionsInvalid(this.quiz);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  onNavTabClicked(tab: string) {
    this.currentTab = tab;
  }
}

