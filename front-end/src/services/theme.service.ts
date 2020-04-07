import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { DomSanitizer } from '@angular/platform-browser';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { Img } from 'src/models/image.model';
import { QuizService } from './quiz.service';
import { Theme } from 'src/models/theme.model';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

    private themeUrl = serverUrl + '/theme';
    private httpOptions = httpOptionsBase;

    constructor(private http: HttpClient) {
    }



    addTheme(them: Theme): void {
        const url = this.themeUrl + '/' + them.id + '/';
        this.http.post<Theme>(url, them, this.httpOptions).subscribe(() => console.log("theme: added..."));
    }
}