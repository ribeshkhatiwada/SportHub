import { AuthService } from './_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _authServices : AuthService){

  }
  canActivate(): boolean{
    if(this._authServices.loggedIn()){
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
