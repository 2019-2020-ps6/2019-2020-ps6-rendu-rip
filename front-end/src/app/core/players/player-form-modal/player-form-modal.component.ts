import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { PlayerService } from 'src/services/player.service';
import { Player } from 'src/models/player.model';
import { ModalService } from 'src/services/modal.service';

@Component({
  selector: 'app-player-form-modal',
  templateUrl: './player-form-modal.component.html',
  styleUrls: ['./player-form-modal.component.scss']
})

export class PlayerFormModalComponent implements OnInit {
  public playerForm: FormGroup;

  @Input()
  player : Player;
  @Input()
  playerImage : Img;

  @Output()
  quitForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  imageTmp : Img = {} as Img;

  constructor(private modalService: ModalService, public formBuilder: FormBuilder, 
    public imageService: ImageService, public playerService: PlayerService) {
  }

  ngOnInit() {
    this.initplayerForm();
    this.initImageTmp();
  }

  initImageTmp(){
    if(!this.player)this.imageTmp = {} as Img;
    else this.imageTmp = this.imageService.imageFillIn(this.playerImage);
  }

  initplayerForm(){
    if(!this.player) this.playerForm = this.formBuilder.group({name: ['']});
    else this.playerForm = this.formBuilder.group({name: [this.player.name]});
  }

  addOrUpdatePlayer() {
    const playerToSave: Player = this.playerForm.getRawValue() as Player;
    if(this.playerService.playerInvalid(playerToSave)) return;
    if(this.player){
      playerToSave.id = this.player.id;
      playerToSave.quizVisible = this.player.quizVisible;
    } 
    else{
      playerToSave.quizVisible = [];//par défaut: ne voit  rien/aucun quiz
    }
    if(this.imageService.isRemoved(this.imageTmp.id))playerToSave.imageId = this.imageTmp.id;
    if(this.imageTmp.url){
      if(this.player) this.playerService.updatePlayerWithImg(playerToSave, this.imageService.imageFillIn(this.imageTmp));
      else this.playerService.addPlayerWithImage(playerToSave, this.imageService.imageFillIn(this.imageTmp));
    }
    else{
      if(this.player) this.playerService.updatePlayer(playerToSave);
      else this.playerService.addPlayer(playerToSave);
    }
    this.reset();
    this.quitForm.emit(true);//false
  }

  ngOnChanges(){
    this.reset()
  }

  reset(){
    if(this.playerForm)this.playerForm.reset()
    this.imageTmp = {} as Img;
    this.initImageTmp();
    this.initplayerForm();
    this.quitForm.emit(false);
  }
  sizeInput(){
    if(!this.player) return 20;
    else if (this.player.name.length>40)return 40;
    else return this.player.name.length;
  }
}
