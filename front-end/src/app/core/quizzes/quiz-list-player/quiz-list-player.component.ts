import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThemeService } from 'src/services/theme.service';
import { PlayerService } from 'src/services/player.service';
import { Player } from 'src/models/player.model';
import { ActivatedRoute } from '@angular/router';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { GlobalService } from 'src/services/global.service';

@Component({
  selector: 'app-quiz-list-player',
  templateUrl: './quiz-list-player.component.html',
  styleUrls: ['./quiz-list-player.component.scss']
})
export class QuizListPlayerComponent implements OnInit {

  public quizList: Quiz[];
  public quizListFiltered: Quiz[];
  public THEME_LIST: string[] = [];
  private ALL_QUIZZES: string='TOUS';
  themeForm: FormGroup;

  private player: Player;
  private image: Img = {} as Img;

  headerTitle: string;

  constructor(private route: ActivatedRoute, public quizService: QuizService, 
    public globalService: GlobalService,
    public formBuilder: FormBuilder, public themeService : ThemeService, 
    public playerService: PlayerService, public imageService: ImageService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.themeFilteringSetup();
    this.playerService.playerSelected$.subscribe((player) => {
      this.onPlayerSelected(player);
      this.headerTitle = player.name;
      this.quizService.quizzes$.subscribe((quizzes) => {
        this.quizList = [];
        this.quizList = quizzes
        this.filteredQuizList();
      });
    });
    this.quizService.setQuizzesFromUrl();
    this.playerService.setSelectedPlayer(id);
  }

  private onPlayerSelected(player: Player) {
    this.player = player;
    this.loadImage();
  }
  
  loadImage(){
    this.image = {} as Img;
    const id = this.player.imageId;
    this.imageService.loadPlayerImage(this.image, id);
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

  filteredQuizList(){
    if(!this.quizList)return null;
    this.quizListFiltered = []
    for (let quiz of this.quizList){
      if(this.hasSelectedTheme(quiz) && this.globalService.isValid(quiz) && this.playerService.quizVisibleByPlayer(this.player,quiz.id)){
        this.quizListFiltered.push(quiz);
      }
    }
  }
}
