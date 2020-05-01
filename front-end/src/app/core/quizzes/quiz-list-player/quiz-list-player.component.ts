import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-quiz-list-player',
  templateUrl: './quiz-list-player.component.html',
  styleUrls: ['./quiz-list-player.component.scss']
})
export class QuizListPlayerComponent implements OnInit {

  public quizList: Quiz[] = [];
  public THEME_LIST: string[] = [];
  private ALL_QUIZZES: string='TOUS';

  themeForm: FormGroup;

  headerTitle = "Liste des quiz"

  constructor(public quizService: QuizService,
              public formBuilder: FormBuilder, public themeService : ThemeService) {
    this.quizService.quizzes$.subscribe((quizzes) => this.quizList = quizzes);
    this.themeFilteringSetup();
  }

  ngOnInit() {
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
    var res =  this.quizList.filter((quiz) => this.hasSelectedTheme(quiz) && this.quizService.isValid(quiz));
    console.log(res);
    return res;
  }
}
