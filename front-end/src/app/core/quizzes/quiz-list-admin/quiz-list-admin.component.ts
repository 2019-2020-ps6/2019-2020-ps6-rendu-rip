import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { ModalService } from 'src/services/modal.service';
import { ThemeService } from 'src/services/theme.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from 'src/services/global.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-quiz-list-admin',
  templateUrl: './quiz-list-admin.component.html',
  styleUrls: ['./quiz-list-admin.component.scss']
})
export class QuizListAdminComponent implements OnInit {

  headerTitle = "Liste des quiz"

  public quizList: Quiz[] = [];
  public THEME_LIST: string[] = [];
  private ALL_QUIZZES: string='TOUS';

  themeForm: FormGroup;

  constructor(private modalService: ModalService, public globalService: GlobalService,
    public quizService: QuizService, public formBuilder: FormBuilder, public themeService : ThemeService) {
    this.quizService.quizzes$.subscribe((quizzes) => this.quizList = quizzes);
    this.themeFilteringSetup();
  }

  themeFilteringSetup() {
    this.themeService.themes$.subscribe((themes) =>{
      this.THEME_LIST = [];
      this.THEME_LIST.push(this.ALL_QUIZZES);
      for(var i =0 ; i<themes.length;i++) {
        this.THEME_LIST.push(themes[i].name)
      }
     });
 
     this.themeForm = this.formBuilder.group({
       theme: this.ALL_QUIZZES
     });
  }

  hasSelectedTheme( quiz: Quiz ) {
    let selectedTheme = this.themeForm.getRawValue() as {theme: string};
    let theme = selectedTheme.theme;

    if (theme===this.ALL_QUIZZES) return true;
    return quiz.theme === theme;
  }

  filteredQuizList() : Quiz[] {
    var res =  this.quizList.filter((quiz) => this.hasSelectedTheme(quiz));
    console.log(res);
    return res;
  }

  ngOnInit() {}
  
  deleteQuiz(quiz: Quiz) { this.quizService.deleteQuiz(quiz); }
}
