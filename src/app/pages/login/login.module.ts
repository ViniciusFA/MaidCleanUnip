import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './../../app.routes';
import { AppRoutingModule } from './../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login/LoginService';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { NgxSocialButtonModule } from 'ngx-social-button';

@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxSocialButtonModule
    ],
    declarations:[LoginComponent],
    exports:[LoginComponent],
    providers: [ LoginService],

})

export class LoginModule{}