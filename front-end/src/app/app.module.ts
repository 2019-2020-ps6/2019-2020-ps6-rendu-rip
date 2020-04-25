import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListAdminComponent } from './core/quizzes/quiz-list-admin/quiz-list-admin.component';
import { QuizListPlayerComponent } from './core/quizzes/quiz-list-player/quiz-list-player.component';
import { QuizComponent } from './core/quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormModalComponent } from './core/quizzes/quiz-form-modal/quiz-form-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizViewComponent } from './core/quizzes/quiz-view/quiz-view.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionComponent } from './core/questions/question/question.component';
import { QuestionFormModalComponent } from './core/questions/question-form-modal/question-form-modal.component';
import { QuestionListComponent } from './core/questions/question-list/question-list.component';
import { AnswerFormComponent } from './core/answers/answer-form-no-need/answer-form-no-need.component';
import { PlayerListAdminComponent } from './core/players/player-list-admin/player-list-admin.component';
import { PlayerComponent } from './core/players/player/player.component';
import { PlayerFormModalComponent } from './core/players/player-form-modal/player-form-modal.component';
import { RunnerComponent} from './game/runner/runner.component';
import { AnswerWidgetComponent} from './game/answer-widget/answer-widget.component';
import { AnswerListWidgetComponent} from './game/answer-list-widget/answer-list-widget.component';
import { HomeComponent } from './start/home/home.component';
import { ScreenAdminComponent } from './start/screen-admin/screen-admin.component';
import { ScreenPlayerComponent } from './start/screen-player/screen-player.component';
import { RecapComponent } from './game/recap/recap.component';
import { EndComponent } from './game/end/end.component';
import { RightAnswerComponent } from './game/right-answer/right-answer.component';
import { ThemeFormComponent } from './core/quizzes/theme-form/theme-form.component';
import { SelectedVSRightAnswerComponent } from './game/selected-vs-right-answer/selected-vs-right-answer.component';
import { PlayerListPlayerComponent } from './core/players/player-list-player/player-list-player.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PasswordComponent } from './start/password/password.component';
import { QuestionViewComponent} from './core/questions/question-view/question-view.component';
import { AnswerViewComponent} from './core/answers/answer-view/answer-view.component';
//import { from } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlayerViewComponent } from './core/players/player-view/player-view.component';
import { StatisticsComponent } from './results/statistics/statistics.component';
import { QuizAttemptComponent } from './results/quiz-attempt/quiz-attempt.component';
import { QuizAttemptDetailsComponent } from './results/quiz-attempt-details/quiz-attempt-details.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListAdminComponent,
    QuizListPlayerComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormModalComponent,
    QuizViewComponent,
    QuestionComponent,
    QuestionFormModalComponent,
    QuestionListComponent,
    AnswerFormComponent,
    PlayerListAdminComponent,
    PlayerComponent,
    PlayerFormModalComponent,
    RunnerComponent,
    AnswerWidgetComponent,
    AnswerListWidgetComponent,
    HomeComponent,
    ScreenAdminComponent,
    ScreenPlayerComponent,
    RecapComponent,
    EndComponent,
    RightAnswerComponent,
    SelectedVSRightAnswerComponent,
    ThemeFormComponent,
    PlayerListPlayerComponent,
    GalleryComponent,
    PasswordComponent,
    QuestionViewComponent,
    AnswerViewComponent,
    PlayerViewComponent,
    StatisticsComponent,
    QuizAttemptComponent,
    QuizAttemptDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
