import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { Player } from 'src/models/player.model';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  type: string;

  @Input()
  isHomeBrand: boolean;

  @Input()
  backIter: string = "-1";

  @Input()
  title: string;

  @Input()
  image: Img = {} as Img;

  @Output()
  tab: EventEmitter<string> = new EventEmitter<string>();
  
  private adminGeneralNav: boolean;
  private adminQuizInfoNav: boolean;
  private adminQuestionInfoNav: boolean;
  private adminPlayerInfoNav: boolean;
  private basicNav: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public imageService: ImageService, private location: Location) {}

  ngOnInit() {
    switch(this.type) {
      case "general": this.adminGeneralNav = true; break;
      case "quizInfo": this.adminQuizInfoNav = true; break;
      case "questionInfo": this.adminQuestionInfoNav = true; break;
      case "playerInfo": this.adminPlayerInfoNav = true; break;
      default: this.basicNav = true;
    }
    this.title = this.title == null? this.title = "Pas de titre" : `${this.title}`
  }

  onclickTab(clicked: string) {
    this.tab.emit(clicked);
  }

  goBack() {
    switch(this.backIter) {
      case "1": this.router.navigate(['..'], {relativeTo: this.route}); break;
      case "2": this.router.navigate(['../..'], {relativeTo: this.route}); break;
      default: this.location.back(); // <-- go back to previous location
    }
  }
}
