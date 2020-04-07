import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Theme } from 'src/models/theme.model';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

    private themeUrl = serverUrl + '/themes';
    private httpOptions = httpOptionsBase;
    private themes :Theme[] = [];
    public  themes$ : BehaviorSubject<Theme[]> = new BehaviorSubject(this.themes);

    constructor(private http: HttpClient) {
      this.setThemes;
      this.http.get<Theme[]>(this.themeUrl).subscribe((themes) => this.setThemes(themes));
    }
    setThemes(themes: Theme[]) {
      this.themes = themes;
      this.themes$.next(this.themes);
    }

    setThemesFromUrl() {
      this.http.get<Theme[]>(this.themeUrl).subscribe((themes) => this.setThemes(themes));
    }


  addTheme(theme: Theme): void {
      this.http.post<Theme>(this.themeUrl, theme, this.httpOptions).subscribe(() => this.setThemesFromUrl());
  } 
}