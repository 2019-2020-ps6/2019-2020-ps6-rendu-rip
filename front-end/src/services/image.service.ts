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
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  public loadAllImgs(images: Img[]) {
    this.loadAllImages(images, "quiz", "")
    this.loadAllImages(images, "question", "")
    this.loadAllImages(images, "answer", "")
    this.loadAllImages(images, "user", "")
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
    this.loadImage(image, `${id == null? 'default/1' : 'quiz/' + id}`, 'Quiz');
  }

  loadQuestionImage(image: Img, id: string){
    //const path = ;//`${serverUrl}/images/question/${id}`;
    this.loadImage(image, `question/${id}`, 'Question');
  }

  loadAnswerImage(image: Img, id: string){
    //const path = ;//`${serverUrl}/images/answer/${id}`;
    this.loadImage(image, `answer/${id}`, 'Answer');
  }

  loadUserImage(image: Img, id: string){
    this.loadImage(image,`user/${id}`, 'User');
  }

  sanitize(url: string) { return this.sanitizer.bypassSecurityTrustUrl(url); }

  deleteQuizImage(image: Img) { this.http.delete<Img>(`${serverUrl}/images/quiz/${image.id}`, this.httpOptions)
    .subscribe(() => console.log("Image: deletion...")); }


  imageFillIn(imageTemporaire : Img){
    const image = {} as Img;
    image.name = imageTemporaire.name;
    image.url = imageTemporaire.url;
    image.type = imageTemporaire.type;
    image.id = imageTemporaire.id;
    return image;
  }

  onChangeFile(event, imageTemporaire : Img) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        imageTemporaire.name = file.name + ' ' + file.type;
        imageTemporaire.url = 'data:image;base64,' + (reader.result as string).split(',')[1];
        imageTemporaire.type = this.localType;
      };
    }
  }

  onUrlClicked(modal, imageTemporaire : Img, url : string) {
    modal.close();
    imageTemporaire.name = "image web";
    imageTemporaire.url = url;
    imageTemporaire.type = this.internetType;
  }
  onImgClicked(modal, imageTemporaire : Img, image : Img) {
    modal.close();
    imageTemporaire.name = image.name;
    imageTemporaire.url = image.url;
    imageTemporaire.type = this.dataBaseType;
    imageTemporaire.id = image.id;
  }

  getImgSrc(imageTemporaire : Img, image : Img) {
    if (imageTemporaire && imageTemporaire.url) {
      return this.sanitize(imageTemporaire.url);
    }
    if(image && image.url){
      return this.sanitize(image.url);
    }
  }
  getImgSrc1(imageTemporaire : Img) {
    if (imageTemporaire && imageTemporaire.url) {
      return this.sanitize(imageTemporaire.url);
    }
  }
}
