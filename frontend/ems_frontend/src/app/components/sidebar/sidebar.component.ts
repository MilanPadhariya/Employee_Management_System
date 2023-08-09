import { Component, OnInit,Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { LeaveService } from 'src/app/services/leave/leave.service';

interface Menu{
  title: string,
  routeLink: string
}

@Component({
  // standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  notification:any=0;
  @Input() user:any;

  menuItems:Menu[]=[];
  sidebar_nav_item_approveLeave = 'sidebar_nav_item_approveLeave';

  ngOnInit() {

    console.log('sidebar notification fetching::::')
    this.leaveService.leaveNotification$.asObservable().subscribe(data=>{
      this.notification=data;
    })
  }

  
  constructor(private router: Router, public langService: LanguageService,private leaveService:LeaveService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && !changes['user'].firstChange) {
      if(this.user.role==='employee'){
        this.menuItems=this.employeeMenuItems;
      }
      else if(this.user.role==='hr'){
        this.menuItems=this.hrMenuItems;
      }
      else if(this.user.role==='director' || this.user.role==='team_lead'){
        this.menuItems=this.TeamLeadMenuItems;
      }
    }
  }

  TeamLeadMenuItems: Menu[]=[
    {
      routeLink:"leave/approve",
      title:'sidebar_nav_item_approveLeave'
    },
    {
      routeLink:"myleaves",
      title:'sidebar_nav_item_myLeaves'
    },
    {
      routeLink:"myprojects",
      title:'sidebar_nav_item_myProjects'
    },
    {
      routeLink:"projects",
      title:'sidebar_nav_item_allProjects'
    }
  ];

  hrMenuItems: Menu[]=[
    {
      routeLink:"leave/approve",
      title:'sidebar_nav_item_approveLeave'
    },
    {
      routeLink:"myleaves",
      title:'sidebar_nav_item_myLeaves'
    },
    {
      routeLink:"addUser",
      title:'sidebar_nav_item_addUser'
    }
  ];

  employeeMenuItems: Menu[]=[
    {
      routeLink:"myleaves",
      title:'sidebar_nav_item_myLeaves'
    },
    {
      routeLink:"myprojects",
      title:'sidebar_nav_item_myProjects'
    }
  ];

  collapsed = false;

  toggleCollapse():void{
    this.collapsed = !this.collapsed;
  }

  closeSidenav():void{
    this.collapsed=false;
  }
}
