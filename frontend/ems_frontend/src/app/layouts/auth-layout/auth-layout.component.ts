import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LanguageService } from 'src/app/services/language/language.service';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})

export class AuthLayoutComponent implements OnInit {
  formGroup!: FormGroup; // Definite assignment assertion
  flag: boolean = false; 
  errorMessage: string="";

  constructor(private authService: AuthService , public langService:LanguageService) {
  }

  ngOnInit(): void {
    // this.authService.invalidCredentials(this.invalidMsg.bind(this));
    this.initform();
  }

  initform():void{
    this.formGroup = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@infusionanalysts\.com$')
      ]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)])
    });
  }

  get password():FormControl{
    return this.formGroup.get('password') as FormControl;
  }

  get emailId():FormControl{
    return this.formGroup.get('email') as FormControl;
  }

  emitLogin() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value)
      .subscribe((res:any)=>{
        console.log(res);
        if(res.success==true){
          localStorage.setItem('access_token', res.token);
          this.authService.getUserProfile(res.id).subscribe((res)=>{
            this.authService.sendUserDetail(res.user);
            this.authService.profileImageUrl$.next(res.user.profileImg);
            this.authService.router.navigate(['/dashboard'])
          })
        }
        else{
          this.flag=true;
          this.errorMessage=res.message;
        }
      });
    }
  }
}
