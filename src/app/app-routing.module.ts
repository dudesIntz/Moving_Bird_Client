import  { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { ContactComponent } from '../app/pages/contact/contact.component';
import { GalleryComponent } from '../app/pages/gallery/gallery.component';
import { SignInOutComponent } from './pages/sign-in-out/sign-in-out.component';
import { AuthGuard } from './auth-guard.service';
import { RoleGuard } from './role-guard.service';

const appRoutes: Routes = [
    {
        path:"", 
        component: HomeComponent},
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
        canActivate: [AuthGuard], 
        component: GalleryComponent},
    {
        path:"signInOut", 
        component: SignInOutComponent
    }
]
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]

})

export class AppRoutingModule{

}