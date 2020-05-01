import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title: string;
  constructor() { }

  ngOnInit() {
    this.title = this.title == null? this.title = "- Jeu de Quiz -" : `- ${this.title} -` 
  }
}
