import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {tap, catchError} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError } from 'rxjs';
import {User} from './user.model';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from '@angular/router';

export interface AuthResponseData {
    idToken : string,
    email : string,
    refreshToken: string,
    expiresIn : string,
    localId : string,
    registered? : boolean
}

@Injectable({
    providedIn: 'root',
  })
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationtiner:any;

    constructor(private http: HttpClient, private router: Router ){

    }

    signup(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOwbsoD0-qZ4QU5Csfa7H0J9SHqvyy16U',
            {
                email: email,
                password:  password,
                returnSecureToken: true
            }
        )
        .pipe(catchError(this.handleError), tap(resData =>{
            this.handleAuthendication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          
        }));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOwbsoD0-qZ4QU5Csfa7H0J9SHqvyy16U',
        {
            email: email,
            password:  password,
            returnSecureToken: true
        }
        )
        .pipe(catchError(this.handleError), tap(resData =>{
            this.handleAuthendication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          
        }));
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/']);
        localStorage.removeItem('userItem');
        if(this.tokenExpirationtiner){
            clearTimeout(this.tokenExpirationtiner);
        }
        this.tokenExpirationtiner = null;
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationtiner = setTimeout(() => {
            this.logout();
        }, 10000);

    }

    autoLogin(){
        console.log("auto login")
        const userData: {
            email:string,
            id: string,
            _token: string,
            _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userItem'));
            console.log("auto login", userData);
        if(!userData){
            this.router.navigate(['/']);
            return;
        }
        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate)
        );
        
        if(loadedUser.token){
            console.log("ooo")
            this.user.next(loadedUser);
            const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDate);
        }
        

    }

    private handleAuthendication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userItem', JSON.stringify(user));
        this.autoLogout(expiresIn * 1000);

    }

    private handleError(errorRes: HttpErrorResponse){
        console.log("mageswari", errorRes);
                let errorMsg = "An unknow error occured!";
                if(!errorRes.error || !errorRes.error.error){
                    return throwError(errorMsg);
                }
                switch(errorRes.error.error.message){
                    case 'INVALID_EMAIL':
                    errorMsg = 'Invalid Email';
                    break;
                    case 'EMAIL_EXISTS':
                    errorMsg = 'This email already exit';
                    break;
                    case 'WEAK_PASSWORD : Password should be at least 6 characters':
                    errorMsg = 'Password should be at least 6 characters';
                    case 'EMAIL_NOT_FOUND':
                    errorMsg = 'email not found';
                    break;
                    case 'INVALID_PASSWORD':
                    errorMsg = 'invalid password';
                    break;
                }
                return throwError(errorMsg); 
    }

}