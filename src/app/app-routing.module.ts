import  { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { ContactComponent } from '../app/pages/contact/contact.component';
import { GalleryComponent } from '../app/pages/gallery/gallery.component';
import { SignInOutComponent } from './pages/sign-in-out/sign-in-out.component';
import {AuthGuard} from './auth/auth-guard.service';
import { RoleGuard } from './role-guard.service';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
    {
        path:"", 
        component: SignInOutComponent},
    {
        path:"contact/:id/:name", 
        canActivate: [RoleGuard], 
         data: { 
            expectedRole: 'user'
        }, 
        component: ContactComponent
    },
    {
        path:"gallery", 
       // canActivate: [AuthGuard],
        component: GalleryComponent},
    {
        path:"signInOut", 
        component: SignInOutComponent
    }
]
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes),
        FormsModule
    ],
    exports:[
        RouterModule
    ]

})

export class AppRoutingModule{

}