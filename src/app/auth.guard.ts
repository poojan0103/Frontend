import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:ProjectService,private router:Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.service.isLoggedIn()){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        this.service.deleteToken();
        return false;
      }
    }
    
}
 