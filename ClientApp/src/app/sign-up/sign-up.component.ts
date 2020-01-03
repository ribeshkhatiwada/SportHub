import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ApiCallService } from '../_services/apicall.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  Team: any;
  model: any = {};
  message: String;
  nameOfTeams = ['Generating Team Names'];
  constructor(private authService: AuthService, private router: Router, private service: ApiCallService) { }

  ngOnInit() {
    this.service.getEnglishPremierLegueData().subscribe(res => {
      this.Team = res;
      this.nameOfTeams = this.Team.Teams.map(x =>
        ({
          'name': x.Name,
          'id': x.TeamId
        })
      );
    });
  }

  register() {
    this.model['isHidden'] = 'false';
    this.authService.register(this.model).subscribe(() => {
      window.alert('register is completed');
      this.router.navigate(['/login']);
    }, error => this.message = error.error
    );
  }
}
