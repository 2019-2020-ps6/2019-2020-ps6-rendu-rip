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
  public defaultType : string = "default";
  public rmImg: string = "remove from object";
  public imageRemovedId = "-1";
  public defaultQuizImageId = "1";
  public defaultQuestionImageId = "2";
  public defaultAnswerImageId = "3";
  public defaultPlayerImageId = "4";
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  public loadAllImgs(images: Img[]) {
    this.loadAllImages(images, "database");
  }

  private loadAllImages(images: Img[], path: string){
    this.http.get<Img[]>( `${serverUrl}/images/${path}`, this.httpOptions).subscribe(imgs => {
      imgs.forEach(i => { 
        const ind = images.length;
        images[ind] = i as Img;
      });
    });
  }

  private loadImage(image: Img, path: string){
    this.http.get<Img>(`${serverUrl}/images/${path}`, this.httpOptions).subscribe(img => {
      if(this.isAnImage(img.id)){
        image.id = img.id;
        image.name = img.name;
        image.url = img.url;
      }
    });
  }

  loadQuizImage(image: Img, id: string){
    if(!this.isAnImage(id)) this.loadImage(image, "default/"+ this.defaultQuizImageId);
    else  this.loadImage(image, "database/" + id);
  }

  loadQuestionImage(image: Img, id: string){
    if(!this.isAnImage(id))return;
    else this.loadImage(image, `database/${id}`);
  }

  loadAnswerImage(image: Img, id: string){
    if(!this.isAnImage(id))return;
    this.loadImage(image, `database/${id}`);
  }

  loadPlayerImage(image: Img, id: string){
    if(!this.isAnImage(id)) {
      this.loadImage(image, "default/"+ this.defaultPlayerImageId);
    }
    else this.loadImage(image,`player/${id}`);
  }

  sanitize(url: string) { return this.sanitizer.bypassSecurityTrustUrl(url); }

  deleteImage(image: Img, images : Img[]) {
    this.http.delete<Img>(`${serverUrl}/images/database/${image.id}`, this.httpOptions)
    .subscribe(() => {
      console.log("Image: deletion...")
    });
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
  isAnImage(id : string){
    return id && id !== "" && id!== this.imageRemovedId;
  }
  isRemoved(id : string){
    return id===this.imageRemovedId;
  }

  removeImg(imageTmp : Img){
    imageTmp.url = undefined;
    imageTmp.name = "removedImage";
    imageTmp.type = "removedImage"
    imageTmp.id = this.imageRemovedId;
  }

}
