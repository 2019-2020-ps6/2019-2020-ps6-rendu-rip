import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/services/theme.service';
import { Theme } from 'src/models/theme.model';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  headerTitle = "Liste des thèmes"

  THEME_LIST : Theme[];

  constructor(private modalService : ModalService, public themeService : ThemeService) {
  }

  ngOnInit() {
      this.loadTheme();
  }

  loadTheme() {
    this.themeService.themes$.subscribe((themes) =>{
      this.THEME_LIST = [];
      for(var i =0 ; i<themes.length;i++) {
        this.THEME_LIST.push(themes[i])
      }
     });
  }

  deleteTheme(theme : Theme){
    this.themeService.deleteTheme(theme);
  }
}