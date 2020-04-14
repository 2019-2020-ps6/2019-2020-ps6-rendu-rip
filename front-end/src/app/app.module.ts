import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizListStaffComponent } from './quizzes/quiz-list-staff/quiz-list-staff.component';
import { QuizListCustomersComponent } from './quizzes/quiz-list-customers/quiz-list-customers.component';
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
import { HomeComponent } from './start/home/home.component';
import { StaffComponent } from './start/staff/staff.component';
import { CustomersComponent } from './start/customers/customers.component';
import { QuizSummaryComponent } from './quiz-sequence/quiz-summary/quiz-summary.component';
import { QuizEndComponent } from './quiz-sequence/quiz-end/quiz-end.component';
import { DisplayRightAnswerComponent } from './quiz-sequence/display-right-answer/display-right-answer.component';
import { ThemeFormComponent } from './quizzes/theme-form/theme-form.component';
import { DisplayRightVersusAnswerSelectedComponent } from './quiz-sequence/display-right-versus-answer-selected/display-right-versus-answer-selected.component';
import { UsersSelectionListComponent } from './users/user-selection-list/user-selection-list.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListStaffComponent,
    QuizListCustomersComponent,
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
    AnswerListWidgetComponent,
    HomeComponent,
    StaffComponent,
    CustomersComponent,
    QuizSummaryComponent,
    QuizEndComponent,
    DisplayRightAnswerComponent,
    DisplayRightVersusAnswerSelectedComponent,
    ThemeFormComponent,
    UsersSelectionListComponent,
    GalleryComponent,
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
export class AppModule {}
