import { Component, OnInit } from '@angular/core';
import {
  SocialService
} from "ngx-social-button";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
 
  shareObj = {
      href: "FACEBOOK-SHARE-LINK",
      hashtag:"#FACEBOOK-SHARE-HASGTAG"
  };
  
  constructor(private socialAuthService: SocialService){}

  ngOnInit() {
  }  

  signOut(){
    if(this.socialAuthService.isSocialLoggedIn()){
        this.socialAuthService.signOut().catch((err)=>{

        });
    }
  }

  getSocialUser(socialUser){
      console.log(socialUser);
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
       // socialPlatformProvider = FacebookLoginProvider.PROVIDER_TYPE;
    }else if(socialPlatform == "google"){
       // socialPlatformProvider = GoogleLoginProvider.PROVIDER_TYPE;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
    (socialUser) => {
        console.log(socialPlatform+" sign in data : " , socialUser);
        // Now sign-in with userData
               
    });
}
  
}
