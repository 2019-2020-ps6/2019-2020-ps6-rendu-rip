import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-selection-list',
  templateUrl: './user-selection-list.component.html',
  styleUrls: ['./user-selection-list.component.scss']
})
export class UsersSelectionListComponent implements OnInit {

  public userList: User[] = [];

  constructor(public userService: UserService) {

    this.userService.users$.subscribe(
      (user) => this.userList = user
      );

    }

  ngOnInit() {

  }

}
