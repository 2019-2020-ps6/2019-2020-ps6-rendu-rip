import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

import { Player } from 'src/models/player.model';
import { Img } from 'src/models/image.model';

@Injectable({
  providedIn: 'root'
})

export class PlayerService {  
  private players: Player[] = [];
  private playerUrl = serverUrl + '/players';

  private httpOptions = httpOptionsBase;
  public players$: BehaviorSubject<Player[]> = new BehaviorSubject(this.players);
  public playerSelected$: Subject<Player> = new Subject();

  constructor(private http: HttpClient) { 
    this.setPlayersFromUrl()
  }

  setplayers(players: Player[]) {
    this.players = players;
    this.players$.next(this.players);
  }

  setPlayersFromUrl() { this.http.get<Player[]>(this.playerUrl).subscribe(players => this.setplayers(players)); }

  setplayer(player: Player){ this.playerSelected$.next(player); }

  setSelectedPlayer(playerId: string) {
    const url = `${this.playerUrl}/${playerId}`;
    this.http.get<Player>(url).subscribe((player) => this.setplayer(player));
  }

  getplayer(usr: Player, playerId: string) {
    const url = `${this.playerUrl}/${playerId}`;
    this.http.get<Player>(url).subscribe((player) => {
      usr = player; 
      this.setplayer(player);
    });
  }

  addplayer(player: Player) { 
    this.http.post<Player>(this.playerUrl, player, this.httpOptions).subscribe(() => {
    this.setPlayersFromUrl()}); }

  addPlayerWithImage(player: Player, image: Img) {
    const url = `${serverUrl}/images/player`;
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      player.imageId = img.id;//(img.id).toString();
      this.addplayer(player);//met à jour observable
    });
  }

  deletePlayer(player: Player) {
    const urlWithId = `${this.playerUrl}/${player.id}`;
    this.http.delete<Player>(urlWithId, this.httpOptions).subscribe(() => this.setPlayersFromUrl());
  }

  updatePlayer(player: Player) {
    const urlWithId = `${this.playerUrl}/${player.id}`;
    console.log( player);
    this.http.put<Player>(urlWithId, player, this.httpOptions).subscribe((player) =>{
    this.setSelectedPlayer(player.id);
    this.setPlayersFromUrl()});
  }


  updateplayerWithImg(player: Player, imgToSave: Img) {
    const url = `${serverUrl}/images/player`;
    this.http.post<Img>(url, imgToSave, this.httpOptions).subscribe(img => {
      player.imageId = img.id;
      this.updatePlayer(player);
    });

    
  }
  playerInvalid(player: Player){
    if(!player){
      window.alert("Erreur");
      return true;
    }
    if(!player.name){
      window.alert("Veuillez mettre un nom.");
      return true;
    }
    return false;
  }
}
