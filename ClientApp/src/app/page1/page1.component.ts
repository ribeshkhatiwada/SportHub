import { ApiCallService } from './../_services/apicall.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  playerArray:any;
  nameOfTeam: any;
  constructor(private http : HttpClient, 
    public service: ApiCallService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(res => {
      this.nameOfTeam = res.Name;
      let idInString = res.teamId;
      let idInInt = parseInt(idInString);
      if (this.service.getPremierLeagueMainData()) {
        let temp = this.service.getPremierLeagueMainData();
        let arr = temp.Teams.filter(team => team.TeamId == idInInt);

        //same variable
        this.playerArray = arr[0].Players;
      } else {
        console.log('inside api');
        this.service.getPlayerDataFromTeamId(idInInt).subscribe(res => {
          //same variable
          this.playerArray = res;
          
        });
      }
    })
  }

 
 
}

