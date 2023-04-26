import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/_service/player.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import  axios  from 'axios';
import { Champions } from '../data/champions';
import { MatchesComponent } from '../matches/matches.component';


@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit{

  playername!: string;
  championNames!: string[] ;
  championsData: any = Champions;


  constructor(private playerservice: PlayerService){
   
  }
  
  
  ngOnInit(): void { }

  dataReceived: any;
  maestrychampions: any;
  championName: any;
  championResults: any;
  champ:any;
  champsCover:any;
  roleChamps:any;
  championsRoles:any;

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
        

        // this make a loop where the 10 chmapions with more points from this user and show then in user page
        for (let i = 0; i <= 9; i++) {
          const champions = result[i];
          const championId = result[i].championId;
          championIds.push(championId);
          maestrychampion.push(champions);
        }
        console.log(maestrychampion)
         //champions ids convert to their names
        const championNameResults = await Promise.all(championIds.map(championId =>
          this.playerservice.getChampionName(championId)));
        this.championNames = championNameResults;
        // console.log(championNameResults);


        const matchingChampion = this.championsData.find((champions: { name: string; }) => champions.name == championNameResults[0]);
        // console.log(matchingChampion);


        const roleChamp = [];
        for (let i = 0; i < championNameResults.length; i++) {
          const championName = championNameResults[i];
          const matchingChampion = this.championsData.find((champions: { name: string; }) => champions.name === championName);
          roleChamp.push(matchingChampion);
        }

        this.roleChamps = roleChamp;
        
          this.champsCover = matchingChampion;
        //  console.log(this.champsCover.coverPicture)
        
         //infomation about the champions
          this.maestrychampions = maestrychampion;
         // console.log(championIds)


        //other way to finde the roles for each champion response

            //   const roles = []
            // for (let i = 0; i < this.roleChamps.length; i++) {
            //   roles.push(this.roleChamps[i].role);
            // }

            // this.championsRoles = roles;
            // console.log(this.championsRoles)
        
      }
       catch (error) {
        console.log(error);
       }     
    }

    
    
  //   for (let i = 0; i <= 2; i++) {
  //     return result[i];
  // }
    
    
  }