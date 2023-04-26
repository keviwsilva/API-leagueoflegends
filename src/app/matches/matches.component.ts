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
  
  constructor(private playerservice: PlayerService){
  }
  
  playerPuuid!: string ;
  playerName!:string;


  async ngOnInit(): Promise<void> {
    this.playerName = this.dataReceived.name
    this.playerPuuid = this.dataReceived.puuid;
    // console.log(playerPuuid);

    
      // try {
      //   const data = await this.playerservice.getPlayerMatches(this.playerPuuid).toPromise();
      //   const matchs = [];
      //   for (let i = 0; i <= 19; i++) {
      //     const matches = data[i];
      //     matchs.push(matches);
      //   }
      //   this.matchesPlayer = matchs;
      //   console.log(this.matchesPlayer);
      //   // const matchId = this.matchesPlayer;
      //   const matchId = this.matchesPlayer;
        
        
      //   const result = await this.playerservice.getInfoMatch(matchId).toPromise();
      //   console.log(result)
        

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
           for (let i = 0; i <= 19; i++) {
          const result = await this.playerservice.getInfoMatch(matchId[i]).toPromise();
          matchIds.push(result)
        }
        console.log(matchIds)
      }

        // console.log(matchs)
        
        // const matchesInfo = await Promise.all(matchs.map((matchId: string) =>
        //   this.playerservice.getInfoMatch(matchId)));
        // this.information = matchesInfo;

        // console.log(matchesInfo)
        // console.log(this.information)
       catch (error) {
        console.log(error);
      }
    }
  
 
  }
  
  
