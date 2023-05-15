import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
// import { Players } from "../_model/players";
// import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})



export class PlayerService {
  constructor(private http: HttpClient) { }

  //API to find player
  sendForm(playername: string) {
    const apikey = 'RGAPI-64b138b1-cbae-4717-a8c5-e304bbc4929e';
    const url = 'https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + encodeURIComponent(playername) + '?api_key=' + apikey;

    return this.http.get<any>(url).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro ao buscar o jogador';

      if (error.status === 404) {
        errorMessage = 'Jogador não encontrado';
      }

      return throwError(errorMessage);
    })
    );
  }
  
  //API to find the maestry champions from player
  getPlayer(playerid: string) {
    const apikey = 'RGAPI-64b138b1-cbae-4717-a8c5-e304bbc4929e';
    const urlchampion = 'https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + playerid + '?api_key=' + apikey;
    
    return this.http.get<any>(urlchampion);
  }

  getPlayerMatches(playerPuuid:string){
    const apikey = 'RGAPI-64b138b1-cbae-4717-a8c5-e304bbc4929e';

    const urlmatchs = 'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/'+playerPuuid+'/ids?start=0&count=20&api_key='+apikey;
    return this.http.get<any>(urlmatchs);
  }

  getInfoMatch(matchId: string){
    const apikey = 'RGAPI-64b138b1-cbae-4717-a8c5-e304bbc4929e';

    const urlmatchid = 'https://americas.api.riotgames.com/lol/match/v5/matches/'+matchId+'?api_key='+apikey;
    return this.http.get<any>(urlmatchid);
  }
  
  // this switch case turn the champion id to their name 
  getChampionName(championId: number): string {
    switch (championId) {
      case 266: return "Aatrox"; break;
      case 103:return "Ahri";break;
      case 84: return "Akali"; break;
      case 32: return "Amumu"; break;
      case 166: return "Akshan"; break;
      case 12: return "Alistar"; break;
      case 34: return "Anivia"; break;
      case 1: return "Annie"; break;
      case 523: return "Aphelios"; break;
      case 22: return "Ashe"; break;
      case 136: return "Aurelion-Sol"; break;
      case 268:return "Azir";break;
      case 432: return "Bard"; break;
      case 200: return "BelVeth"; break;
      case 53: return "Blitzcrank"; break;
      case 201: return "Braum"; break;
      case 63: return "Brand"; break;
      case 51: return "Caitlyn"; break;
      case 164: return "Camille"; break;
      case 69: return "Cassiopeia"; break;
      case 164: return "Camille"; break;
      case 164: return "Camille"; break;
      case 164: return "Camille"; break;
      case 31: return "Chogath"; break;
      case 42: return "Corki"; break;
      case 122: return "Darius"; break;
      case 36: return "Dr-Mundo"; break;
      case 131: return "Diana"; break;
      case 119: return "Draven"; break;
      case 245: return "Ekko"; break;
      case 60: return "Elise"; break;
      case 28: return "Evelynn"; break;
      case 81: return "Ezreal"; break;
      case 9: return "Fiddlesticks"; break;
      case 114: return "Fiora"; break;
      case 105: return "Fizz"; break;
      case 3: return "Galio"; break;
      case 887: return "Gwen"; break;
      case 41: return "Gangplank"; break;
      case 86: return "Garen"; break;
      case 150: return "Gnar"; break;
      case 79: return "Gragas"; break;
      case 104: return "Graves"; break;
      case 120: return "Hecarim"; break;
      case 74: return "Heimerdinger"; break;
      case 420: return "Illaoi"; break;
      case 39: return "Irelia"; break;
      case 427: return "Ivern"; break;
      case 40: return "Janna"; break;
      case 59: return "Jarvan-IV"; break;
      case 24: return "Jax"; break;
      case 126: return "Jayce"; break;
      case 202: return "Jhin"; break;
      case 222: return "Jinx"; break;
      case 145: return "KaiSa"; break;
      case 429: return "Kalista"; break;
      case 43: return "Karma"; break;
      case 30: return "Karthus"; break;
      case 38: return "Kassadin"; break;
      case 55: return "Katarina"; break;
      case 10: return "Kayle"; break;
      case 141: return "Kayn"; break;
      case 85: return "Kennen"; break;
      case 121: return "Khazix"; break;
      case 203: return "Kindred"; break;
      case 240: return "Kled"; break;
      case 897: return "KSante"; break;
      case 96: return "KogMaw"; break;
      case 7: return "LeBlanc"; break;
      case 64: return "Lee-Sin"; break;
      case 89: return "Leona"; break;
      case 127: return "Lissandra"; break;
      case 117: return "Lulu"; break;
      case 876: return "Lillia"; break;
      case 236: return "Lucian"; break;
      case 99: return "Lux"; break;
      case 90: return "Malzahar"; break;
      case 57: return "Maokai"; break;
      case 25: return "Morgana"; break;
      case 54: return "Malphite"; break;
      case 82: return "Mordekaiser"; break;
      case 11: return "Master-yi"; break;
      case 21: return "Miss-Fortune"; break;
      case 902: return "Milio"; break;
      case 111: return "Nautilus"; break;
      case 518: return "Neeko"; break;
      case 76: return "Nidalee"; break;
      case 267: return "Nami"; break;
      case 75: return "Nasus"; break;
      case 895: return "Nilah"; break;
      case 56: return "Nocturne"; break;
      case 20: return "nunu-amp-willump"; break;
      case 61: return "Orianna"; break;
      case 2: return "Olaf"; break;
      case 516: return "Ornn"; break;
      case 78: return "Poppy"; break;
      case 80: return "Pantheon"; break;
      case 555: return "Pyke"; break;
      case 133: return "Quinn"; break;
      case 246: return "Qiyana"; break;
      case 68: return "Rumble"; break;
      case 92: return "Riven"; break;
      case 421: return "RekSai"; break;
      case 58: return "Renekton"; break;
      case 13: return "Ryze"; break;
      case 497: return "Rakan"; break;
      case 33: return "Rammus"; break;
      case 888: return "Renata-glasc"; break;
      case 526: return "Rell"; break;
      case 107: return "Rengar"; break;
      case 14: return "Sion"; break;
      case 37: return "Sona"; break;
      case 517: return "Sylas"; break;
      case 235: return "Senna"; break;
      case 27: return "Singed"; break;
      case 16: return "Soraka"; break;
      case 102: return "Shyvana"; break;
      case 875: return "Sett"; break;
      case 360: return "Samira"; break;
      case 35: return "Shaco"; break;
      case 50: return "Swain"; break;
      case 72: return "Skarner"; break;
      case 113: return "Sejuani"; break;
      case 147: return 'Seraphine'; break;
      case 98: return "Shen"; break;
      case 15: return "Sivir"; break;
      case 134: return "Syndra"; break;
      case 91: return "Talon"; break;
      case 23: return "Tryndamere"; break;
      case 48: return "Trundle"; break;
      case 4: return "Twisted-Fate"; break;
      case 17: return "Teemo"; break;
      case 223: return "Tahm-Kench"; break;
      case 412: return "Thresh"; break;
      case 163: return "Taliyah"; break;
      case 44: return "Taric"; break;
      case 29: return "Twitch"; break;
      case 18: return "Tristana"; break;
      case 77: return "Udyr"; break;
      case 6: return "Urgot"; break;
      case 112: return "Viktor"; break;
      case 67: return "Vayne"; break;
      case 110: return "Varus"; break;
      case 45: return "Veigar"; break;
      case 161: return "VelKoz"; break;
      case 254: return "Vi"; break;
      case 234: return "Viego"; break;
      case 8: return "Vladimir"; break;
      case 106: return "Volibear"; break;
      case 711: return "Vex"; break;
      case 62: return "Wukong"; break;
      case 19: return "Warwick"; break;
      case 101: return "Xerath"; break;
      case 5: return "Xin-Zhao"; break;
      case 498: return "Xayah"; break;
      case 157: return "Yasuo"; break;
      case 777: return "Yone"; break;
      case 350: return "Yuumi"; break;
      case 83: return "Yorick"; break;
      case 238: return "Zed"; break;
      case 221: return "Zeri"; break;
      case 154: return "Zac"; break;
      case 115: return "Ziggs"; break;
      case 26: return "Zilean"; break;
      case 143: return "Zyra"; break;
      case 142: return "Zoe"; break;
      default: return 'erro'; break;
    }
  }
}
