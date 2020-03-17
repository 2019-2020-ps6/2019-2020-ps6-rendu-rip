import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  userDeleted: EventEmitter<User> = new EventEmitter<User>();
  constructor() {
  }

  ngOnInit() {
  }
  deleteUser() {
    this.userDeleted.emit(this.user);
  }

}
