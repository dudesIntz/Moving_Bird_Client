import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
}
