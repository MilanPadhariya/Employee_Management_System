import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { delay, timeout } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatChipsModule,MatInputModule,ReactiveFormsModule],
})

export class EditprofileComponent implements OnInit {
  constructor(private authService:AuthService, public router:Router,private employeeService:EmployeeService){}
  ngOnInit(): void{
    console.log("editUserComponent initialized::::::::::::::::")
    this.getUserDetails();
  }
  currentUser:any={};
  getUserDetails():any{
    // this.authService.userDetail$.subscribe(userData=>this.currentUser=userData);

    this.authService.getUserProfile(localStorage.getItem('userId')).subscribe(res=>{
      this.currentUser=res.user;
      // this.authService.sendUserDetail(res.user);
      this.authService.profileImageUrl$.next(res.user.profileImg);
      console.log('getUserProfile Subscribed::::::::::::');
    })
    
  }


  keywords = ['angular', 'Javascript', 'Typescript', 'PostgreSQL','Sequelize','MySQL','MOngoDB','React',"dwdwfdwfwfwfw",'dscdwcevesve'];
  formControl = new FormControl(['angular']);

  announcer = inject(LiveAnnouncer);

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
      this.currentUser.skills.push({name:value,master:""});
      this.newKeywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  newKeywords:string[]=[];
  saveKeywords():any{
    console.log(this.newKeywords);
    this.employeeService.addUserSkill(this.newKeywords).subscribe(res=>{
      if(res.success){
        alert(res.message);
      }
    })
  }

  shortLink: string = "";
  loading: boolean = false;
  file: any = null;

  onChange(event:any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.authService.upload(this.file).subscribe(
        (res: any) => {


                // Short link via api response

                if(res.success) {
                  setTimeout(() => {
                    this.loading = false; // Flag variable 
                    this.ngOnInit();
                  },2000);
                }
                else{
                  alert("Upload failed");
                }


        }
    );
}


}
