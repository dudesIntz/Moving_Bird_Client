import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService{
    constructor(private jwtHelper: JwtHelperService) {
    }

    loggedIn = false;

    isAuthenticated(){
        
        const promise = new Promise(
            (resolve, reject)=>{
                setTimeout(()=>{
                    resolve(this.loggedIn)

                }, 100)
            }
        );
        return promise;
    }
    logIn(){
        this.loggedIn = true;
    }
    logOut(){
        this.loggedIn = false;
    }

}