import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Img } from 'src/models/image.model';
import { ImageService } from 'src/services/image.service';
import { PlayerService } from 'src/services/player.service';
import { Player } from 'src/models/player.model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-player-form-modal',
  templateUrl: './player-form-modal.component.html',
  styleUrls: ['./player-form-modal.component.scss']
})

export class PlayerFormModalComponent implements OnInit {
  public playerForm: FormGroup;
  public urlForm: FormGroup
  modalOptions:NgbModalOptions;


  @Input()
  player : Player;
  @Input()
  playerImage : Img;

  @Output()
  quitForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  imageTmp : Img = {} as Img;
  gallery : Img[] = [];

  constructor(private modalService: NgbModal, public formBuilder: FormBuilder, 
    public imageService: ImageService, public playerService: PlayerService) {
  }

  ngOnInit() {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
    this.initplayerForm();
    this.initUrlForm();
    this.imageService.loadAllQuizImages(this.gallery);
  }

  initplayerForm(){
    if(!this.player) this.playerForm = this.formBuilder.group({name: ['']});
    else this.playerForm = this.formBuilder.group({name: [this.player.name]});
  }

  initUrlForm() {
    this.urlForm = this.formBuilder.group({url: ""});
  }

  addOrUpdateplayer() {
    const playerToSave: Player = this.playerForm.getRawValue() as Player;
    if(this.playerService.playerInvalid(playerToSave))return;
    if(this.player) playerToSave.id = this.player.id;
    if(this.imageTmp.url){
      if(this.player) this.playerService.updateplayerWithImg(playerToSave, this.imageService.imageFillIn(this.imageTmp));
      else this.playerService.addPlayerWithImage(playerToSave, this.imageService.imageFillIn(this.imageTmp));
    }
    else{
      if(this.player) this.playerService.updatePlayer(playerToSave);
      else this.playerService.addplayer(playerToSave);
    }
    if(!this.player)this.reset();
    this.quitForm.emit(false);
  }

  open(content) {
    this.modalService.open(content, this.modalOptions);
  }

  onUrlClicked(modal) {
    this.imageService.onUrlClicked(modal, this.imageTmp, this.urlForm.getRawValue().url)
  }
 
  reset(){
    this.playerForm.reset()
    this.imageTmp = {} as Img;
    this.initplayerForm();
    this.quitForm.emit(false);
  }
}
