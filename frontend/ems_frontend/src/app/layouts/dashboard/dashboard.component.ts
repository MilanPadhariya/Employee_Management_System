import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  notificationData: any;
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.getUserDetails();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notificationData'] && !changes['notificationData'].firstChange) {
      console.log('notification data in dashboard component::',this.notificationData);
    }
  }

  currentUser:object|null=null;

	getUserDetails():any{
	  this.authService.getUserProfile(localStorage.getItem('userId')).subscribe(res=>{
      this.currentUser=res.user;
		  this.authService.profileImageUrl$.next(res.user.profileImg);
	  })
	}
}
