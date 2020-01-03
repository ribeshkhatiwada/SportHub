import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCallService } from './../_services/apicall.service';
import {HttpClient} from '@angular/common/http';
import {Component , OnInit, Output} from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 5000, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit {
  englishPremierdata: any;
  team : any;
  player : any;
  websites : String;
  loading = true;
 
  constructor(private http : HttpClient, 
    private service: ApiCallService, 
    public activatedRoute:ActivatedRoute,
    private router:Router) {
  }
  ngOnInit() {
    this.englishPremier();
  }

  englishPremier() {
    this.service.getEnglishPremierLegueData().subscribe(res => {
      this.englishPremierdata = res;
      this.service.setPremierLeague(this.englishPremierdata);
      this.team = this.englishPremierdata.Teams;
      this.loading = false;
    });

  }
  getWebsite(team){
    this.websites= this.team.Website;
  }

  showPlayers(team){
    let id = team.TeamId;
    let name = team.Name;
    this.router.navigate(['/players'], { queryParams: {teamId: id, Name: name}, skipLocationChange: false});

  }


}
