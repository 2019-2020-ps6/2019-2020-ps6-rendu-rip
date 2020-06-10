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

  setPlayer(player: Player){ this.playerSelected$.next(player); }

  setSelectedPlayer(playerId: string) {
    const url = `${this.playerUrl}/${playerId}`;
    console.log(`Player ${playerId} selected`)
    this.http.get<Player>(url).subscribe((player) => this.setPlayer(player));
  }

  getPlayer(usr: Player, playerId: string) {
    const url = `${this.playerUrl}/${playerId}`;
    this.http.get<Player>(url).subscribe((player) => {
      usr.id = player.id;
      usr.name = player.name;
      usr.imageId = usr.imageId;
      this.setPlayer(player);
    });
  }

  addPlayer(player: Player) { 
    this.http.post<Player>(this.playerUrl, player, this.httpOptions).subscribe(() => {
    this.setPlayersFromUrl()}); }

  addPlayerWithImage(player: Player, image: Img) {
    const url = `${serverUrl}/images/player`;
    this.http.post<Img>(url, image, this.httpOptions).subscribe(img => {
      player.imageId = img.id;//(img.id).toString();
      this.addPlayer(player);//met à jour observable
    });
  }

  deletePlayer(player: Player) {
    const urlWithId = `${this.playerUrl}/${player.id}`;
    this.http.delete<Player>(urlWithId, this.httpOptions).subscribe(() => this.setPlayersFromUrl()); 
  }

  updatePlayer(player: Player) {
    const urlWithId = `${this.playerUrl}/${player.id}`;
    this.http.put<Player>(urlWithId, player, this.httpOptions).subscribe((player) =>{
    this.setSelectedPlayer(player.id);
    this.setPlayersFromUrl()});
  }

  updatePlayerWithImg(player: Player, imgToSave: Img) {
    const url = `${serverUrl}/images/player`;
    this.http.post<Img>(url, imgToSave, this.httpOptions).subscribe(img => {
      player.imageId = img.id;
      this.updatePlayer(player);
    });
  }

  quizVisibleByPlayer(player : Player, quizId : string){
    if(player){
      if(!player.quizVisible)player.quizVisible=[];
      for(let qId of player.quizVisible){
        if(qId===quizId){
          return true;
        }
      }
      return false;
    }
    return false;
  }

  quizVisibleByAll(players : Player[],quizId: string){
    for (let player of players){
      if(!this.quizVisibleByPlayer(player,quizId)){
        return false;
      }
    }
    return true;
  }

  quizVisibleByNobody(players : Player[], quizId : string){
    for (let player of players){
      if(this.quizVisibleByPlayer(player,quizId)){
        return false;
      }
    }
    return true;
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
