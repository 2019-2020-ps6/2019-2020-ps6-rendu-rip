import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { QuestionWidgetComponent } from './quiz-sequence/question-widget/question-widget.component';



const routes: Routes = [
    { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
    { path: 'user', component: UserListComponent },
    { path: 'quiz-list', component: QuizListComponent },
    { path: 'edit-quiz/:id', component: EditQuizComponent },
    { path: 'quiz-sequence/:id', component:QuestionWidgetComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

