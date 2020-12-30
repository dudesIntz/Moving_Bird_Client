import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { NAMED_ENTITIES } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { exhaust, exhaustMap, take } from "rxjs/operators";
import {AuthService} from '../auth/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authservice: AuthService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authservice.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);

            })
            
        );
       
    }
}