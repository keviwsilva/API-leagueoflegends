import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/_service/player.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import  axios  from 'axios';


@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit{

  // searchForm:FormGroup = new FormGroup({
  //   search:new FormControl('')
  // })
  // private playerservice: PlayerService
  playername!: string;
  championNames!: string[] ;
  // public userList:Array<any> = [];
  constructor(private playerservice: PlayerService){
   
  }

   
  ngOnInit(): void { }

  dataReceived: any;
  maestrychampions: any;
  championName: any;
  championResults: any;

    async send() {
      try {
        //this search the player infomation
        const data = await this.playerservice.sendForm(this.playername).toPromise();
          this.dataReceived = data;
          const playerId = data.id;
        // this use the result from the first API and use the player id to find their maestry champions
        const result = await this.playerservice.getPlayer(playerId).toPromise();
         const maestrychampion = [];
         const championIds = [];

        // this make a loop where the 3 chmapions with more points from this user and show then in user page
        for (let i = 0; i <= 2; i++) {
          const champions = result[i];
          const championId = result[i].championId;
          championIds.push(championId);
          maestrychampion.push(champions);
        }
         //champions ids convert to their names
        const championNameResults = await Promise.all(championIds.map(championId =>
          this.playerservice.getChampionName(championId)));
        this.championNames = championNameResults;

        //infomation about the champions
        this.maestrychampions = maestrychampion;
        console.log(championIds)
        
      } catch (error) {
        console.log(error);
      }
    }
    
    
  //   for (let i = 0; i <= 2; i++) {
  //     return result[i];
  // }
    
    
  }