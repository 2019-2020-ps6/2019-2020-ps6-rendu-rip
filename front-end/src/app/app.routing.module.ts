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
import { GalleryComponent } from './gallery/gallery.component';
import { PassewordComponent } from './start/password/password.component';
import { EditQuestionComponent } from './quizzes/edit-question/edit-question.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

///BIIIIIIIIIIIIIIIIIIIIIIIIIIIG CLEAN TODO!
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'customers', component: UsersSelectionListComponent},
    { path: 'customers/:customerId', component: CustomersComponent},
    { path: 'password', component: PassewordComponent },
    //{ path: 'user-selection', component: UsersSelectionListComponent },
    { path: 'staff/quiz-list', component: QuizListStaffComponent },
    { path: 'edit-quiz', component: EditQuizComponent },//no data fetching --> empty fields but exact same layout
    { path: 'edit-quiz/:id', component: EditQuizComponent },
    { path: 'edit-user/:id', component: EditUserComponent },
    { path: 'edit-quiz/:id/:questionId', component: EditQuestionComponent},
    //{ path: 'edit-quiz/:id', component: EditQuizComponent }, --> specifier plusieurs routes pour modifier depuis plusieurs endroits
    { path: 'gallery', component: GalleryComponent},
    //ET bouton 'Retour' revenir au bon endroit
    { path: 'staff/user-list', component: UserListComponent },
    
    { path: 'customers/quiz-list-customers', component: QuizListCustomersComponent },
    //{ path: 'customers/:id/quiz-list-customers', component: CustomerComponent }, --> page avec liste quiz d'un accueilli
    { path: 'customers/:customerId/quiz-sequence/:id', component: QuestionWidgetComponent},
    { path: 'customers/:customerId/quiz-sequence/:id/quiz-summary', component: QuizSummaryComponent },
    { path: 'customers/:customerId/quiz-sequence/:id/quiz-end', component: QuizEndComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

