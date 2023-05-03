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
  loading: boolean = false;

  async ngOnChanges(): Promise<void> {
    this.playerName = this.dataReceived.name
    this.playerPuuid = this.dataReceived.puuid;
    
    
    try {
      this.loading = true;

      const data = await this.playerservice.getPlayerMatches(this.playerPuuid).toPromise();
      const matchs = [];
          for (let i = 0; i <= 19; i++) {
            const matches = data[i];
            matchs.push(matches);
          }
          this.matchesPlayer = matchs;
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
            const idChamp = [];
            for (let i = 0; i <= 9; i++) {
              const minionsKiled = result.info.participants[i].totalMinionsKilled;
              const neutralminions = result.info.participants[i].neutralMinionsKilled;
              let totalMinions = minionsKiled + neutralminions;
              const champ = result.info.participants[i]
              const perChamp = []
              for (let i = 0; i <= 9; i++) {
                const total = totalMinions[i]
                perChamp.push(total)
              }
              totalMinionsKilled.push(totalMinions)
              cs.push(perChamp)
              idChamp.push(champ)
            }
            totalCschamp.push(cs)
            minions.push(totalMinionsKilled)
            matchMode.push(result.info.gameMode)
            matchIds.push(result.info.participants)
            champId.push(idChamp)
          }
          this.matchinfo = matchIds
          this.championsIds =champId;

          const nameResult = [];
            
            for (let i = 0; i <= 19; i++) {
              const championNameResults = this.championsIds[i]
              const info = [];
             for (let i = 0; i <= 9; i++) {
          const result = championNameResults[i].championId
          const championName = this.playerservice.getChampionName(result);
          info.push(championName)
             }
             
             
            nameResult.push(info)
         
          }
          // console.log(nameResult)
          this.picChamp = nameResult;

        
          this.matchMode = matchMode
        
    
        this.totalCs = minions
        this.loading = false;
      }
      
       catch (error) {
         console.log(error);
        }
      }
      
      

      
      
    }
  
    

    
    