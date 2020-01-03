import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  message: String;
  constructor(private authServices: AuthService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.authServices.login(this.model).subscribe(next => {
      let idOfUser = this.authServices.getID();
      this.authServices.getTeamIDs(idOfUser).subscribe(res => {
        console.log(res);
      });
      window.alert('logged in successfully');
      this.router.navigate(["/team"]);

    }, error => {
      this.message = error.error;
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
