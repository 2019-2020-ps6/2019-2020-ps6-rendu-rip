import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './start/home/home.component';
import { StaffComponent } from './start/staff/staff.component';
import { CustomersComponent } from './start/customers/customers.component';
import { QuizListStaffComponent } from './quizzes/quiz-list-staff/quiz-list-staff.component';
import { QuizListCustomersComponent } from './quizzes/quiz-list-customers/quiz-list-customers.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { QuestionWidgetComponent } from './quiz-sequence/question-widget/question-widget.component';
import { QuizSummaryComponent } from './quiz-sequence/quiz-summary/quiz-summary.component';
import { QuizEndComponent } from './quiz-sequence/quiz-end/quiz-end.component';
import { UsersSelectionListComponent } from './users/user-selection-list/user-selection-list.component';
import { GaleryComponent } from './galery/galery.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'user-selection', component: UsersSelectionListComponent },
    { path: 'staff/quiz-list', component: QuizListStaffComponent },
    { path: 'edit-quiz/:id', component: EditQuizComponent },
    //{ path: 'edit-quiz/:id', component: EditQuizComponent }, --> specifier plusieurs routes pour modifier depuis plusieurs endroits
    { path: 'galery', component: GaleryComponent},
    //ET bouton 'Retour' revenir au bon endroit
    { path: 'staff/user-list', component: UserListComponent },
    
    { path: 'customers/quiz-list-customers', component: QuizListCustomersComponent },
    //{ path: 'customers/:id/quiz-list-customers', component: CustomerComponent }, --> page avec liste quiz d'un accueilli
    { path: 'quiz-sequence/:id', component: QuestionWidgetComponent},
    { path: 'quiz-sequence/:id/quiz-summary', component: QuizSummaryComponent },
    { path: 'quiz-sequence/:id/quiz-end', component: QuizEndComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

