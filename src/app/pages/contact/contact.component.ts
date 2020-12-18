import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  user:{
    id:number,
    name:string
  }

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("hii", this.router.snapshot);
    this.user ={
      id:this.router.snapshot.params['id'],
      name:this.router.snapshot.params['name']
    }
      console.log( this.user);

      this.router.params.subscribe((params:Params) =>{
          this.user.id = params.id;
          this.user.name = params.name;

      })
  }

}
