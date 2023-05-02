import { Component,EventEmitter,Input, OnInit, Output, OnChanges } from '@angular/core';
import { JogadorComponent } from '../jogador/jogador.component';
import { PlayerService } from 'src/_service/player.service';
import { Champions } from '../data/champions';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnChanges{

  @Input() dataReceived: any;
  matchesPlayer: any;
  information: any;
  matchinfo!: any[];
  totalCs!: any;
  matchMode!: any[];
  jogador?: JogadorComponent;
  championsData: any = Champions;

  @Output() playerNameClicked = new EventEmitter<string>();
  championsIds?: any[];
  championNames?: string[];
  picChamp: any;
  roleChamps?: any[];

  playerNamesearch(playername: string) {
    this.jogadorComponent.onPlayerNameClicked(playername)
  }
  
  constructor(private jogadorComponent: JogadorComponent,private playerservice: PlayerService){
  }
  
  playerPuuid!: string ;
  playerName!:string;
  

  async ngOnChanges(): Promise<void> {
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
          // console.log(this.matchesPlayer);
          const matchId = this.matchesPlayer;
          
          const matchIds = [];
          const minions =[];
          const totalCschamp = [];
          const matchMode = [];
          const champId = [];
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
            champId.push(result.info.participants)
          }
          this.matchinfo = matchIds
          this.championsIds =champId;
          // console.log(this.championsIds)
          // console.log(this.championsIds)


          
          const championNameResults = champId.map(championId =>
            this.playerservice.getChampionName(championId));
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
          // console.log(this.roleChamps)
          this.matchMode = matchMode
          // console.log(matchIds)
          // console.log(totalCschamp)
          
          
          // for(let i=0; i<=9; i++){
        //   const minionsKiled = matchIds[i].totalMinionsKilled;
        //   const neutralminions = matchIds[i].neutralMinionsKilled;
        //   let totalMinions = minionsKiled + neutralminions;
        
        //   totalMinionsKilled.push(minionsKiled)
        // }
        this.totalCs = minions
        // console.log(minions)
        
      }
      
       catch (error) {
         console.log(error);
        }
      }
      
      

      
      
    }
  
    

    
    