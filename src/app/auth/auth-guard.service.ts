import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor( private router: Router, private authService: AuthService){

    }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean {

            return this.authService.user.pipe(take(1), map( user=>{
                const isAuth = !!user;
                if(isAuth){
                    return true;
                }
               return this.router.createUrlTree(['/']);
            }));
    }
}