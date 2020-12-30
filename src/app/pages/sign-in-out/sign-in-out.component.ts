import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-sign-in-out',
  templateUrl: './sign-in-out.component.html',
  styleUrls: ['./sign-in-out.component.css']
})
export class SignInOutComponent implements OnInit {
  
  title = 'LearningApp';
  isLoginMode:boolean =false;
  isLoading:boolean = false;
  error:string = null;
  constructor(private authService: AuthService, private router: Router){

  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
    this.isLoading = false;
    console.log(this.isLoginMode);
  }
  onSubmit(form: NgForm){
    if(!form.valid){
      console.log("form invalid");
      return;
    }
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode){
        console.log("login mode");
        authObs = this.authService.login(email, password);
        form.reset();
    }
    else{
      console.log("sign in mode");
      authObs = this.authService.signup(email, password);
      form.reset();
    } 

    authObs.subscribe(
      resData => {
        console.log("resDta", resData);
        this.isLoading = false;
        this.error ='';
        this.isLoginMode = true;
        if(resData.registered){
          this.router.navigate(['/gallery']);
        }
        
     },
     errorMsg => {
        console.log("errorMessaged", errorMsg);
        this.error = errorMsg;
        this.isLoading = false;

     }
    );
    
    //form.reset();
  }
  
  ngOnInit(): void {
  }

}
