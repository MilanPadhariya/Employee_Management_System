import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { LeavespageComponent } from './components/leavespage/leavespage.component';
import { ProjectspageComponent } from './components/projectspage/projectspage.component';
import { MyleavesComponent } from './components/leavespage/myleaves/myleaves.component';
import { ApproveleaveComponent } from './components/leavespage/approveleave/approveleave.component';
import { AuthGuard } from './auth.guard';
import { ErrorpageComponent } from './layouts/errorpage/errorpage.component';
import { MyprojectsComponent } from './components/projectspage/myprojects/myprojects.component';
import { AllprojectsComponent } from './components/projectspage/allprojects/allprojects.component';
import { ProjectdetailsComponent } from './components/projectspage/projectdetails/projectdetails.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';

const routes: Routes = [
  { path:'dashboard',canActivate:[AuthGuard],
    component: DashboardComponent,
    children:[
      { path:'leave/approve',
        loadComponent:()=>import('./components/leavespage/approveleave/approveleave.component').then(m=>m.ApproveleaveComponent),
      //  component:ApproveleaveComponent
      },
      { path:'myleaves',
        loadComponent:()=>import('./components/leavespage/myleaves/myleaves.component').then(m=>m.MyleavesComponent),
      //  component: MyleavesComponent
      },
      {path:'addUser', 
        loadComponent:()=>import('./components/adduser/adduser.component').then(m=>m.AdduserComponent),
        // component:AdduserComponent
      },
      {path:'me',
        // loadComponent:()=>import('./components/editprofile/editprofile.component').then(m=>m.EditprofileComponent),
        component:EditprofileComponent
      },
      { path:'projects/details/:id', 
        loadComponent:()=>import('./components/projectspage/projectdetails/projectdetails.component').then(m=>m.ProjectdetailsComponent),
        // component:ProjectdetailsComponent
      },
      { path:'myprojects',
        loadComponent:()=>import('./components/projectspage/myprojects/myprojects.component').then(m=>m.MyprojectsComponent),
        // component: MyprojectsComponent
      },
      { path:'projects',
        loadComponent:()=>import('./components/projectspage/allprojects/allprojects.component').then(m=>m.AllprojectsComponent),
        // component: AllprojectsComponent
      },
      { path:'', redirectTo:'myleaves', pathMatch:'full'}
    ]
  },
  { path:'login', component: AuthLayoutComponent},
  {path:"error",component:ErrorpageComponent},
  { path:'', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
