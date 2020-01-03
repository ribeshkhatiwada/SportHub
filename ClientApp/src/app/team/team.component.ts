import {
  Component,
  OnInit,
  Sanitizer
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  DomSanitizer
} from '@angular/platform-browser';
import {
  AuthService
} from '../_services/auth.service';
import {
  ApiCallService
} from '../_services/apicall.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  football: any;

  //liverpool: any;
  mainDataOfPlayersOfMyTeam: any;

  isEmpty: boolean;
  search: any;
  userDisplayName: string;

  /**New variables */
  currentTeamIframeUrl: any;
  teamData: any;
  myTeam: any;
  players: any;


  constructor(private http: HttpClient,
    public sanitizer: DomSanitizer,
    public teamApi: ApiCallService,
    public authService: AuthService) {}

  async ngOnInit() {

    this.userDisplayName = this.authService.getUsername();
    let userId = this.authService.getID();
    let teamId = await this.authService.getTeamIDs(userId).toPromise();
    if (typeof (teamId) === 'number') {
      this.teamApi.getEnglishPremierLegueData().subscribe((team) => {
        this.teamData = team["Teams"];
        this.myTeam = this.teamData.filter(obj => obj.TeamId == teamId)["0"];
        this.players = this.myTeam["Players"];
        this.mainDataOfPlayersOfMyTeam = this.players;
        this.currentTeamIframeUrl = this.safeUrl(this.myTeam["Website"]);
      });
    } else {
      window.alert('Something went wrong!');
    }
  }
  SearchPlayer(userInput) {
    this.isEmpty = false;
    this.players = this.mainDataOfPlayersOfMyTeam.filter(item => 
      item.FirstName.toLowerCase().includes(userInput.toLowerCase())
       || item.LastName.toLowerCase().includes(userInput.toLowerCase()));
    if (this.players.length === 0) {
      this.isEmpty = true;
    }
  }
  safeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
