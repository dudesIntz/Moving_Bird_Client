import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';


export interface PostModel{
  title: string,
  content: string,
  id?: string
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  loadedPosts = [];


  constructor(private http: HttpClient, private dataService: DataStorageService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.dataService.storeData(postData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {

  }
  onLogout(){
    this.authService.logout();
   
  }

  private fetchPosts(){
    this.dataService.fetchData().subscribe(res =>{
      this.loadedPosts = res;
    })
  }
}
