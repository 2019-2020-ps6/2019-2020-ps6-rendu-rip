import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './start/home/home.component';
import { ScreenAdminComponent } from './start/screen-admin/screen-admin.component';
import { ScreenPlayerComponent } from './start/screen-player/screen-player.component';
import { QuizListAdminComponent } from './core/quizzes/quiz-list-admin/quiz-list-admin.component';
import { QuizListPlayerComponent } from './core/quizzes/quiz-list-player/quiz-list-player.component';
import { QuizViewComponent } from './core/quizzes/quiz-view/quiz-view.component';
import { PlayerListAdminComponent } from './core/players/player-list-admin/player-list-admin.component';
import { RunnerComponent } from './game/runner/runner.component';
import { RecapComponent } from './game/recap/recap.component';
import { EndComponent } from './game/end/end.component';
import { PlayerListPlayerComponent } from './core/players/player-list-player/player-list-player.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PasswordComponent } from './start/password/password.component';
import { QuestionViewComponent } from './core/questions/question-view/question-view.component';
import { PlayerViewComponent } from './core/players/player-view/player-view.component';
import { StatisticsComponent } from './results/statistics/statistics.component';
import { QuizAttemptDetailsComponent } from './results/quiz-attempt-details/quiz-attempt-details.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },

    { path: 'login', component: PasswordComponent },
    { path: 'admin', component: ScreenAdminComponent },

    { path: 'admin/gallery', component: GalleryComponent},

    { path: 'admin/quiz-list', component: QuizListAdminComponent },
    { path: 'admin/quiz-list/:id', component: QuizViewComponent },
    { path: 'admin/quiz-list/:id/:questionId', component: QuestionViewComponent},

    { path: 'admin/player-list', component: PlayerListAdminComponent },
    { path: 'admin/player-list/:id', component: PlayerViewComponent },
    { path: 'admin/player-list/:id/statistics', component: StatisticsComponent },
    { path: 'admin/player-list/:id/statistics/:attemptId', component: QuizAttemptDetailsComponent },


    { path: 'players', component: ScreenPlayerComponent },
    { path: 'players/:id', component: QuizListPlayerComponent },
    { path: 'players/:id/game/:quizId', component: RunnerComponent },
    { path: 'players/:id/game/:quizId/recap', component: RecapComponent },
    { path: 'players/:id/game/:quizId/end', component: EndComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

