import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../_services/apicall.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent implements OnInit {
  standing : any;
  forSearchStanding : any;
  loading = true;
  isEmpty : boolean;
  constructor(private service:ApiCallService, private http : HttpClient) {
   }

  ngOnInit() {
    this.getTheStanding();
  }

  getTheStanding() {
    this.service.getStanding()
    .pipe(map((arr: any[]) => arr.slice(0, 20)), map(arr => arr.sort((a, b) => a["Order"] - b["Order"])))
    .subscribe(res => {
        this.standing = res;
        this.loading=false;
        this.forSearchStanding = res;
      });
  }
  
 
  SearchTeamStanding(userInput) {
    this.isEmpty = false;
   this.standing = this.forSearchStanding.filter(item => item.ShortName.toLowerCase().includes(userInput.toLowerCase()));
   if(this.standing.length==0){
    this.isEmpty=true;
   }
  }

}
