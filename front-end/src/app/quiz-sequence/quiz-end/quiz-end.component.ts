import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.scss']
})
export class QuizEndComponent implements OnInit {

  private user: User;

  constructor(private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('customerId');
    this.userService.setSelectedUser(id);
    this.userService.userSelected$.subscribe((user) => this.onUserSelected(user));
  }

  private onUserSelected(user: User) {
    this.user = user;
  }
}


