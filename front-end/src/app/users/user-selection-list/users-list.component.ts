import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public userList: User[] = [];

  constructor(public userService: UserService) {

    this.userService.users$.subscribe(
      (user) => this.userList = user
      );

    }

  ngOnInit() {

  }

}
