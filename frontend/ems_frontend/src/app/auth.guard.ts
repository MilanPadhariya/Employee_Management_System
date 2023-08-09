import {Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn:'root',
})

export class AuthGuard{
  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn() !== true) {
      this.router.navigate(['error']);
    }
    return true;
  }
}