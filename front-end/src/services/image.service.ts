import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { DomSanitizer } from '@angular/platform-browser';
import { Img } from 'src/models/image.model';

@Injectable({
  providedIn: 'root'
})

export class ImageService {

  private httpOptions = httpOptionsBase;
  public localType : string = "local";
  public dataBaseType : string = "dataBase";
  public internetType : string = "internet";
  public rmImg: string = "remove from object";
  public defaultQuizImageId = "1";
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  public loadAllImgs(images: Img[]) {
    this.loadAllImages(images, "database", "");
    //this.loadAllImages(images, "player", "");//just to delete some then hide
    /*this.loadAllImages(images, "quiz", "")
    this.loadAllImages(images, "question", "")
    this.loadAllImages(images, "answer", "")
    this.loadAllImages(images, "user", "")*/
  }

  private loadAllImages(images: Img[], path: string, log: string){
    this.http.get<Img[]>( `${serverUrl}/images/${path}`, this.httpOptions).subscribe(imgs => {
      imgs.forEach(i => { 
        const ind = images.length;
        images[ind] = i as Img;
        console.log(`${log}BD: adding image - ${i.name}`);
      });
    });
  }

  private loadImage(image: Img, path: string, log: string){
    console.log(`${serverUrl}/images/${path}`)
    this.http.get<Img>(`${serverUrl}/images/${path}`, this.httpOptions).subscribe(img => {
      console.log(`${log}: charging image - ${img.name}`);
      image.id = img.id;
      image.name = img.name;
      image.url = img.url;
    });
  }

  loadAllQuizImages(images: Img[]){
    this.loadAllImages(images, 'quiz', 'Quiz');
  }

  loadQuizImage(image: Img, id: string){
    //this.loadImage(image, `${id == null? 'default/1' : 'quiz/' + id}`, 'Quiz');
    this.loadImage(image, `${id == null? 'default/1' : 'database/' + id}`, 'Quiz');
  }

  loadQuestionImage(image: Img, id: string){
    //const path = ;//`${serverUrl}/images/question/${id}`;
    //this.loadImage(image, `question/${id}`, 'Question');
    this.loadImage(image, `database/${id}`, 'Question');
  }

  loadAnswerImage(image: Img, id: string){
    //const path = ;//`${serverUrl}/images/answer/${id}`;
    //this.loadImage(image, `answer/${id}`, 'Answer');
    this.loadImage(image, `database/${id}`, 'Answer');
  }

  loadPlayerImage(image: Img, id: string){
    this.loadImage(image,`player/${id}`, 'Player');
  }

  sanitize(url: string) { return this.sanitizer.bypassSecurityTrustUrl(url); }

  deleteQuizImage(image: Img) { 
    this.deleteImage(image);
  }

  deleteImage(image: Img) {
    this.http.delete<Img>(`${serverUrl}/images/database/${image.id}`, this.httpOptions)
    .subscribe(() => console.log("Image: deletion..."));
  }

  deletePlayerPhoto(image: Img) {
    this.http.delete<Img>(`${serverUrl}/images/player/${image.id}`, this.httpOptions)
    .subscribe(() => console.log("Image: deletion..."));
  }

  imageFillIn(imageTmp : Img){
    const image = {} as Img;
    image.name = imageTmp.name;
    image.url = imageTmp.url;
    image.type = imageTmp.type;
    image.id = imageTmp.id;
    return image;
  }

  onChangeFile(event, imageTmp : Img) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        imageTmp.name = file.name + ' ' + file.type;
        imageTmp.url = 'data:image;base64,' + (reader.result as string).split(',')[1];
        imageTmp.type = this.localType;
        imageTmp.id = undefined;
      };
    }
  }

  onUrlClicked(modal, imageTmp : Img, url : string) {
    modal.close();
    imageTmp.name = "image web";
    imageTmp.url = url;
    imageTmp.type = this.internetType;
    imageTmp.id = undefined;
  }

  onImgClicked(modal, imageTmp : Img, image : Img) {
    modal.close();
    imageTmp.name = image.name;
    imageTmp.url = image.url;
    imageTmp.type = this.dataBaseType;
    imageTmp.id = image.id;
  }

  getImgSrc(imageTmp : Img, image : Img) {
    if (imageTmp && imageTmp.url) {
      return this.sanitize(imageTmp.url);
    }
    if(image && image.url){
      return this.sanitize(image.url);
    }
  }
  getImgSrc1(imageTmp : Img) {
    if (imageTmp && imageTmp.url) {
      return this.sanitize(imageTmp.url);
    }
  }
}
