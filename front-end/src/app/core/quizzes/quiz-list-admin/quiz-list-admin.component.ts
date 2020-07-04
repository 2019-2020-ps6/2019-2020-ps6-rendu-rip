import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { ThemeService } from 'src/services/theme.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from 'src/services/global.service';
import { QuizService } from 'src/services/quiz.service';
import { SortDatePipe } from 'src/services/sortDate.pipe';

@Component({
  selector: 'app-quiz-list-admin',
  templateUrl: './quiz-list-admin.component.html',
  styleUrls: ['./quiz-list-admin.component.scss']
})
export class QuizListAdminComponent implements OnInit {

  headerTitle = "Liste des quiz"

  public quizList: Quiz[];
  public quizListFiltered: Quiz[];
  public THEME_LIST: string[] = [];
  private ALL_QUIZZES: string='TOUS';
  private ordreChro : boolean; 

  themeForm: FormGroup;

  constructor(private sortDate : SortDatePipe, public globalService: GlobalService,
    public quizService: QuizService, public formBuilder: FormBuilder, public themeService : ThemeService) {
      this.quizService.quizzes$.subscribe((quizzes) =>{
        this.quizList = [];
        this.quizList = quizzes;
        this.themeFilteringSetup();
    })
    
  }

  ngOnInit() {}

  themeFilteringSetup() {
    this.themeForm = this.formBuilder.group({
      theme: this.ALL_QUIZZES
    });
    this.themeService.themes$.subscribe((themes) =>{
      this.THEME_LIST = [];
      this.THEME_LIST.push(this.ALL_QUIZZES);
      this.filteredQuizList();
      for(var i =0 ; i<themes.length;i++) {
        if(this.themeService.themeIsUsed(themes[i],themes,this.quizListFiltered)){
          this.THEME_LIST.push(themes[i].name)
        }
      }
     });
  }

  hasSelectedTheme( quiz: Quiz ) {
    const selectedTheme = (this.themeForm.getRawValue() as {theme: string}).theme;
    return selectedTheme == this.ALL_QUIZZES || selectedTheme == quiz.theme;
  }

  filteredQuizList() : Quiz[] {
    if(!this.quizList) return;
    this.quizListFiltered = this.quizList.filter((quiz) => this.hasSelectedTheme(quiz));
    this.ordreChro = false;
    this.sortDate.transform(this.quizListFiltered,"-creationDate")
  }

  switchOrder(){
    this.ordreChro = !this.ordreChro;
    if(this.ordreChro)
      this.sortDate.transform(this.quizListFiltered,"creationDate")
    else
      this.sortDate.transform(this.quizListFiltered,"-creationDate")
  }
  
  deleteQuiz(quiz: Quiz) { this.globalService.deleteQuiz(quiz); }
}
