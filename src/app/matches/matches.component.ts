import { Component,Input, OnInit } from '@angular/core';

import { PlayerService } from 'src/_service/player.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit{

  @Input() dataReceived: any;
  matchesPlayer: any;
  information: any;
  matchinfo!: any[];
  totalCs!: any;
  matchMode!: any[];
  
  constructor(private playerservice: PlayerService){
  }
  
  playerPuuid!: string ;
  playerName!:string;


  async ngOnInit(): Promise<void> {
    this.playerName = this.dataReceived.name
    this.playerPuuid = this.dataReceived.puuid;
    

        try {
          const data = await this.playerservice.getPlayerMatches(this.playerPuuid).toPromise();
          const matchs = [];
          for (let i = 0; i <= 19; i++) {
            const matches = data[i];
            matchs.push(matches);
          }
          this.matchesPlayer = matchs;
          console.log(this.matchesPlayer);
          const matchId = this.matchesPlayer;

          const matchIds = []
          const minions =[]
          const totalCschamp = []
          const matchMode = []
          for (let i = 0; i <= 19; i++) {
            const result = await this.playerservice.getInfoMatch(matchId[i]).toPromise();
            const cs = []
            const totalMinionsKilled = [];
            for (let i = 0; i <= 9; i++) {
              const minionsKiled = result.info.participants[i].totalMinionsKilled;
              const neutralminions = result.info.participants[i].neutralMinionsKilled;
              let totalMinions = minionsKiled + neutralminions;
              const perChamp = []
              for (let i = 0; i <= 9; i++) {
                const total = totalMinions[i]
                perChamp.push(total)
              }
              totalMinionsKilled.push(totalMinions)
              cs.push(perChamp)
            }
            totalCschamp.push(cs)
            minions.push(totalMinionsKilled)
            matchMode.push(result.info.gameMode)
            matchIds.push(result.info.participants)
          }
        this.matchinfo = matchIds
        this.matchMode = matchMode
        console.log(matchIds)
        console.log(totalCschamp)
        
        // for(let i=0; i<=9; i++){
        //   const minionsKiled = matchIds[i].totalMinionsKilled;
        //   const neutralminions = matchIds[i].neutralMinionsKilled;
        //   let totalMinions = minionsKiled + neutralminions;

        //   totalMinionsKilled.push(minionsKiled)
        // }
        this.totalCs = minions
        console.log(minions)
      
      }

       catch (error) {
        console.log(error);
      }
    }
  
 
  }
  
  


