import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class RoleGuard implements CanActivate{

   constructor( private router: Router){

   }
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
                    const tokenPayload: string = "user";
                    const expectedRole = route.data.expectedRole;
                    //const token = localStorage.getItem('token');
                    if (tokenPayload!== expectedRole) {
                        this.router.navigate(['signInOut']);
                        return false;
                    }
                    return true;

     }

}