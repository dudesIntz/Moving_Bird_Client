import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in-out',
  templateUrl: './sign-in-out.component.html',
  styleUrls: ['./sign-in-out.component.css']
})
export class SignInOutComponent implements OnInit {

  
  title = 'LearningApp';
  isSlected:boolean =true;
  constructor(){

  }
  ani(){
    this.isSlected = true;
    console.log(this.isSlected);
  }
  ani1(){
    this.isSlected = false;
    console.log(this.isSlected);
  }

  ngOnInit(): void {
  }

}
