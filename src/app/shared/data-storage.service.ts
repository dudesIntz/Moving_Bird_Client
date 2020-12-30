import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { PostModel } from "../pages/gallery/gallery.component";
import {AuthService} from '../auth/auth.service';

@Injectable(
    {providedIn: 'root'}
)
export class DataStorageService{
    constructor(private http: HttpClient, private authService: AuthService){

    }

    storeData(postData){
        return this.http.post( 'https://e-learning-370ea-default-rtdb.firebaseio.com/posts.json',
        postData)

    }

    fetchData(){
       
                return this.http.get(
                  'https://e-learning-370ea-default-rtdb.firebaseio.com/posts.json',
                 
                ).pipe(
              map(responseData =>{
                const postArray: PostModel[] =[];
                for(let key in responseData){
                  postArray.push({...responseData[key], id: key});
                }
                return postArray;
                
            })

        );
    }

}