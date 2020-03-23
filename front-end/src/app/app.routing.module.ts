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



const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'customers', component: CustomersComponent },
    //{ path: 'customers/:id/quiz-list-customers', component: CustomerComponent }, --> page avec liste quiz d'un accueilli
    { path: 'user', component: UserListComponent },//staff/user? --> staff/customers-list?
    { path: 'quiz-list-staff', component: QuizListStaffComponent },
    { path: 'quiz-list-customers', component: QuizListCustomersComponent },
    { path: 'edit-quiz/:id', component: EditQuizComponent },//staff/edit-quiz/:id?
    { path: 'quiz-sequence/:id', component:QuestionWidgetComponent},//?
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

