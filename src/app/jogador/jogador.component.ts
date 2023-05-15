import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlayerService } from 'src/_service/player.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Champions } from '../data/champions';
import { MatchesComponent } from '../matches/matches.component';


@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit{
  constructor(private playerservice: PlayerService){
    
  }
  
  ngOnInit(): void { }
  
  playername!: string;
  championNames!: string[] ;
  championsData: any = Champions;
  dataReceived: any;
  maestrychampions: any;
  champsCover:any;
  roleChamps:any;
  loading: boolean = false;
  erro: any = false;
  result: boolean = false;

  async onPlayerNameClicked(playername: string) {
    let audio = document.getElementById("audioOption2") as HTMLAudioElement;
    audio.play();
    audio.volume = 0.3;
    try {
      this.erro = false
      this.loading = true;
      //this search the player infomation
      const data = await this.playerservice.sendForm(playername).toPromise();
      this.dataReceived = data;
      const playerId = data.id;
      // this use the result from the first API and use the player id to find their maestry champions
      const result = await this.playerservice.getPlayer(playerId).toPromise();
         const maestrychampion = [];
         const championIds = [];
         
         
         // this make a loop where the 10 chmapions with more points from this user and show then in user page
         for (let i = 0; i <= 9; i++) {
          const champions = result[i];
          const championId = result[i].championId;
          championIds.push(championId);
          maestrychampion.push(champions);
        }
        //champions ids convert to their names
        const championNameResults = await Promise.all(championIds.map(championId =>
          this.playerservice.getChampionName(championId)));
          this.championNames = championNameResults;
          
          
          const matchingChampion = this.championsData.find((champions: { name: string; }) => champions.name == championNameResults[0]);
         

          const roleChamp = [];
          for (let i = 0; i < championNameResults.length; i++) {
            const championName = championNameResults[i];
            const matchingChampion = this.championsData.find((champions: { name: string; }) => champions.name === championName);
          roleChamp.push(matchingChampion);
        }

        this.roleChamps = roleChamp;
        
        this.champsCover = matchingChampion;
        
        //infomation about the champions
        this.maestrychampions = maestrychampion;
        this.loading = false;
        this.result = true;
          }catch (error) { 
      this.result = false
      this.loading = false;
      this.erro = true
      const err = error;
      this.erro = err
      console.log(error);
    }
  }
  

  async send() {
    let audio = document.getElementById("audioOption1") as HTMLAudioElement;
    audio.play();
    audio.volume = 0.3;
    try {
      this.erro = false
      this.loading = true;
      //this search the player infomation
      const data = await this.playerservice.sendForm(this.playername).toPromise();
      this.dataReceived = data;
      const playerId = data.id;
      
      // this use the result from the first API and use the player id to find their maestry champions
      const result = await this.playerservice.getPlayer(playerId).toPromise();
         const maestrychampion = [];
         const championIds = [];
         
         // this make a loop where the 10 chmapions with more points from this user and show then in user page
         for (let i = 0; i <= 9; i++) {
          const champions = result[i];
          const championId = result[i].championId;
          championIds.push(championId);
          maestrychampion.push(champions);
        }
        //champions ids convert to their names
        const championNameResults = await Promise.all(championIds.map(championId =>
          this.playerservice.getChampionName(championId)));
          this.championNames = championNameResults;

          const matchingChampion = this.championsData.find((champions: { name: string; }) => champions.name == championNameResults[0]);
         
          const roleChamp = [];
          for (let i = 0; i < championNameResults.length; i++) {
            const championName = championNameResults[i];
            const matchingChampion = this.championsData.find((champions: { name: string; }) => champions.name === championName);
          roleChamp.push(matchingChampion);
        }
        
        this.roleChamps = roleChamp;
        
        this.champsCover = matchingChampion;
        
        //infomation about the champions
        this.maestrychampions = maestrychampion;
        this.loading = false;
        this.result = true
          }
          catch (error) {
            this.result = false
            this.loading = false;
            this.erro = true
            const err  =error; 
            this.erro = err 
            console.log(error);
          
          }     
        }
        
        }