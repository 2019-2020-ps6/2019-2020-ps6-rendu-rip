import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  private PWD = '1234';
  headerTitle = "Connexion à l'espace du personnel";

  loginForm: FormGroup;
  isCorrect: boolean = true;
  counter: number = 0;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
  }

  loginUser() {
    this.counter++;
    const password = this.loginForm.get('password').value;
    if (password === this.PWD) {
      this.router.navigate(['admin/quiz-list']);
      return;
    }
    this.isCorrect = false;
    if (this.counter === 3) { // if entered password 3 times wrong that means it's a user who wants to acces and not a staff !!
      this.counter = 0; // reset on 0
      this.router.navigate(['home']); // redirect to home page
    }
  }
}
