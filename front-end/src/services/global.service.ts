import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

import { Quiz } from '../models/quiz.model';
import { Question } from 'src/models/question.model';
import { Answer } from 'src/models/answer.model';
import { Img } from 'src/models/image.model';
import { ImageService } from './image.service';
import { QuizService } from './quiz.service';
import { QuestionService } from './question.service';
import { AnswerService } from './answer.service';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  // private quizUrl = ' http://localhost:9428/api/quizzes';

  private httpOptions   = httpOptionsBase;
  private quizUrl       = `${serverUrl}/quizzes`;
  private imgUrl        = `${serverUrl}/images/database`;
  private questionsPath = 'questions';
  private answersPath   = 'answers';
  

  //TODO clean a bit
  public localType: string      = "local";
  public dataBaseType: string   = "dataBase";
  public internetType: string   = "internet";
  public defaultType: string    = "default";
  public rmImg: string          = "remove from object";
  public imageRemovedId         = "-1";
  public defaultQuizImageId     = "1";
  public defaultQuestionImageId = "2";
  public defaultAnswerImageId   = "3";
  public defaultPlayerImageId   = "4";
  //

  constructor(private http: HttpClient, private quizService: QuizService, private questionService: QuestionService, private answerService: AnswerService, private imageService: ImageService) {
  }

  //::::::::::::::::::::::::::::::Quiz::::::::::::::::::::::::::::::
  loadQuiz(quizId: string, output: Quiz) {
    this.quizService.loadQuiz(quizId, output);
  }

  loadQuizAndImage(quizId: string, output: Quiz, image: Img ) {
    this.quizService.loadQuizAndImage(this.imageService, quizId, output, image);
  }

  setQuizzes(quizzes: Quiz[]) {
    this.quizService.setQuizzes(quizzes);
  }

  setQuizzesFromUrl() {
    this.quizService.setQuizzesFromUrl();
  }

  setQuiz(quiz: Quiz) {
    this.quizService.setQuiz(quiz);
  }

  setSelectedQuiz(quizId: string) {
    this.quizService.setSelectedQuiz(quizId);
  }

  addQuiz(quiz: Quiz) {
    this.quizService.addQuiz(quiz);
  }

  addQuizWithImage(quiz: Quiz, image: Img) {
    this.quizService.addQuizWithImage(quiz, image);
  }

  updateQuiz(quiz: Quiz) {
    this.quizService.updateQuiz(quiz);
  }

  updateQuizWithImage(quiz: Quiz, image: Img) {
    this.quizService.updateQuizWithImage(quiz, image);
  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuiz(quiz);
  }

  quizInvalid(quiz :Quiz): boolean {
    return this.quizService.quizInvalid(quiz);
  }

  //::::::::::::::::::::::::::::::Question::::::::::::::::::::::::::::::
  loadQuestion(question : Question, quizId: string, questionId: string) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}`;
    this.questionService.loadQuestion(question, url);
  }

  loadQuestionAndImage(quizId: string, questionId: string, name: string, question : Question, image : Img) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}`;
    this.questionService.loadQuestionAndImage(this.imageService, name, url, question, image);
  }

  addQuestion(quizId: string, question: Question) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}`;
    this.questionService.addQuestion(this.quizService, url, question);
  }

  addQuestionWithImage(quizId: string, question: Question, image: Img) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}`;
    this.questionService.addQuestionWithImage(this.quizService, url, question, this.imgUrl, image);
  }

  updateQuestion(quizId: string, question: Question) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${question.id}`;
    this.questionService.updateQuestion(this.quizService, url, question);
  }

  updateQuestionWithImage(quizId: string, question: Question, image: Img){
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${question.id}`;
    this.questionService.updateQuestionWithImage(this.quizService, url, question, this.imgUrl, image);
  }

  deleteQuestion(quizId: string, questionId: string) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}`;
    this.questionService.deleteQuestion(this.quizService, url, quizId);
  }

  questionInvalid(question: Question): boolean {
    return this.questionService.questionInvalid(question);
  }

  //::::::::::::::::::::::::::::::Answer::::::::::::::::::::::::::::::

  addAnswer(quizId: string, questionId: string, answer: Answer) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}/${this.answersPath}`;
    this.answerService.addAnswer(this.quizService, url, quizId, answer);
  }

  addAnswerWithImage(quizId: string, questionId: string, answer: Answer, image: Img) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}/${this.answersPath}`;
    this.answerService.addAnswerWithImage(this.quizService, url, quizId, answer, this.imgUrl, image);
  }

  updateAnswer( quizId: string, questionId: string, answer: Answer) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}/${this.answersPath}/${answer.id}`;
    this.answerService.updateAnswer(this.quizService, url, quizId, answer);
  }

  updateAnswerWithImage(quizId: string, questionId: string, answer: Answer, image: Img){
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}/${this.answersPath}/${answer.id}`;
    this.answerService.updateAnswerWithImage(this.quizService, url, quizId, answer, this.imgUrl, image);
  }

  deleteAnswer(quizId: string, questionId: string, answerId: string) {
    const url = `${this.quizUrl}/${quizId}/${this.questionsPath}/${questionId}/${this.answersPath}/${answerId}`;
    this.answerService.deleteAnswer(this.quizService, url, quizId);
  }

  answersInvalid(answers: Answer[]): string {
    return this.answerService.answersInvalid(answers);
  }

  answerInvalid(answer : Answer, imageId : string): boolean {
    return this.answerService.answerInvalid(answer, imageId);
  }

  //::::::::::::::::::::::::::::::Image::::::::::::::::::::::::::::::

  public loadAllImgs(images: Img[]) {
    this.imageService.loadAllImgs(images);
  }

  loadQuizImage(image: Img, id: string) {
    this.imageService.loadQuizImage(image, id);
  }

  loadQuestionImage(image: Img, id: string) {
    this.imageService.loadQuestionImage(image, id);
  }

  loadAnswerImage(image: Img, id: string) {
    this.imageService.loadAnswerImage(image, id);
  }

  loadPlayerImage(image: Img, id: string) {
    this.loadPlayerImage(image, id);
  }

  sanitize(url: string) {
    return this.imageService.sanitize;
  }

  deleteImage(image: Img) {
    this.imageService.deleteImage(image);
  }

  deletePlayerPhoto(image: Img) {
    this.imageService.deletePlayerPhoto(image);
  }

  imageFillIn(imageTmp: Img): Img {
    return this.imageService.imageFillIn(imageTmp);
  }

  onChangeFile(event, imageTmp: Img) {
    this.imageService.onChangeFile(event, imageTmp);
  }

  onUrlClicked(modal, imageTmp: Img, url: string) {
    this.imageService.onUrlClicked(modal, imageTmp, url);
  }

  onImgClicked(modal, imageTmp : Img, image : Img) {
    this.imageService.onImgClicked(modal, imageTmp, image);
  }

  getImgSrc1(imageTmp : Img) {
    return this.imageService.getImgSrc1(imageTmp);
  }

  getImgSrc2(imageTmp: Img, image: Img) {
    return this.imageService.getImgSrc2(imageTmp, image);
  }

  isAnImage(id: string): boolean {
    return this.imageService.isAnImage(id);
  }

  isRemoved(id: string): boolean{
    return this.imageService.isRemoved(id);
  }

  removeImg(imageTmp: Img) {
    this.imageService.removeImg(imageTmp);
  }

  //::::::::::::::::::::::::::::::other::::::::::::::::::::::::::::::
  //sert??
  sizeInput(value: string){
    if(!value) return 20;
    if(value.length>40) return 40;
    return value.length;
  }

  //TODO: rewrite (esthetic)
  checkIfImageIsUsed(id: string, res: Img) {
    this.http.get<Quiz[]>(serverUrl+"/quizzes", this.httpOptions).subscribe((quizzes) => {
      quizzes.forEach(quiz => {
        if(quiz.imageId==id){
          console.log(quiz)
          res.name = "true";
        }
        quiz.questions.forEach(question => {
          if(question.imageId==id){
            console.log(question)
            res.name = "true";
          } 
          question.answers.forEach(answer =>{
            if(answer.imageId==id){
              console.log(answer)
              res.name = "true";
            } 
          })
        })
      })
      if(!res.name) res.name = "false";
    });
  }

  // check if a quiz is valid. Retun true if quiz is valid, false otherwise.
  isValid(quiz: Quiz): boolean {
    if(!quiz || !quiz.name || !quiz.theme || !quiz.questions || quiz.questions.length === 0) 
      return false;
    quiz.questions.forEach(question => {
      if(this.answersInvalid(question.answers) === "-1") return false
    });
    return true;
  }
}