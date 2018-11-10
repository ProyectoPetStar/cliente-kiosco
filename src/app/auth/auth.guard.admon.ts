import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardAdmon implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        
        if(this.auth.isAuthenticated()){
            return true;
          }
          this.router.navigate(['administracion/login']);
          return false;
        
    }


}
