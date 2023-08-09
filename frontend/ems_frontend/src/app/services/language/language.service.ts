import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(public translate:TranslateService) {
    translate.addLangs(['en','hi']);

    // translate.setDefaultLang('en');
  }

  initializeLanguage(){
    this.translate.setDefaultLang('en');
  }
  switchLang(lang: string){
    this.translate.use(lang);
  }
}
