import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiCallService {
  premierLeagueMainData:any;

  constructor(private http: HttpClient) { 
  }

  getEnglishPremierLegueData(){
    return this.http.get('https://api.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/epl?key=7d61188ecc5c484cab4b4f279665a769');
  }

  getPlayerDataFromTeamId(id:number){
    return this.http.get('https://api.sportsdata.io/v3/soccer/scores/json/PlayersByTeam/'+id+'?key=7d61188ecc5c484cab4b4f279665a769');
  }
  getStanding(){
    return this.http.get('https://api.sportsdata.io/v3/soccer/scores/json/Standings/383?key=7d61188ecc5c484cab4b4f279665a769');
  }
  getSchedule(){
    return this.http.get('https://api.sportsdata.io/v3/soccer/scores/json/Schedule/383?key=7d61188ecc5c484cab4b4f279665a769');
  }

  setPremierLeague(data){
    this.premierLeagueMainData = data;
  }

  getPremierLeagueMainData(){
    return this.premierLeagueMainData;
  }
  
}
