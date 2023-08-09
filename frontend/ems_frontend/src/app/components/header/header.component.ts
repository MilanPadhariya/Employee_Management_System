import { Component,OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LanguageService } from 'src/app/services/language/language.service';

interface Food {
  value: string;
  viewValue: string;
} 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  currentUserProfile:string|null=null;
  ngOnInit(): void {
    
    this.authService.profileImageUrl$.subscribe((profileImg)=>{
      this.currentUserProfile=profileImg;
      console.log('profileImg Url in header after subscribing to subject::::',profileImg);
      // console.log(this.currentUserProfile);
    });
    console.log("header loaded");
  }
  constructor(private authService: AuthService, public langService:LanguageService) {}
  currentUserName=this.authService.getCurrentUserName();


  selectedValue!: string;
  

  changeLang(event:Event,lang:string):void{
    event.preventDefault();
    this.langService.switchLang(lang);
  }
  x():void{
    console.log('x');
  }
  logout():void{
    this.authService.logout();
  }
}
