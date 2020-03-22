import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import { HttpClientModule } from '@angular/common/http';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { AppRoutingModule } from './app.routing.module';
import { QuestionsComponent } from './quizzes/questions/questions.component';
import { QuestionFormComponent } from './quizzes/question-form/question-form.component';
import { QuestionListComponent } from './quizzes/question-list/question-list.component';
import { AnswerFormComponent } from './quizzes/answer-form/answer-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserComponent } from './users/user/user.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import {QuestionWidgetComponent} from './quiz-sequence/question-widget/question-widget.component';
import {AnswerWidgetComponent} from './quiz-sequence/answer-widget/answer-widget.component';
import {AnswerListWidgetComponent} from './quiz-sequence/answer-list-widget/answer-list-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionsComponent,
    QuestionFormComponent,
    QuestionListComponent,
    AnswerFormComponent,
    UserListComponent,
    UserComponent,
    UserFormComponent,
    QuestionWidgetComponent,
    AnswerWidgetComponent,
    AnswerListWidgetComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
