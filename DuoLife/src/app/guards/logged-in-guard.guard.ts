import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable()
export class LoggedInGuardGuard implements CanLoad {

  constructor(private auth:AuthService,private router:Router){}
  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.user$
      .pipe(
        take(1),
        map(user => user ? false : false),
        tap(isLoggedIn => {
          debugger;
          return true;
        }));
  }
  
}
