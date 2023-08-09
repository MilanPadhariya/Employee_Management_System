import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { NumberValueAccessor } from '@angular/forms';
import {Location} from '@angular/common'
import { MatButtonModule } from '@angular/material/button';
interface User{
  name: string,
  role: string,
  emp_id: string,
  email_id: string,
  profileImg:string,
  works: {
      starting_date: string,
      ending_date: string|null,
  }
}

interface Module{
  name: string,
  module_id: string,
  team_lead:User,
  users:User[]
}

interface Project{
    Name: string,
    company: string,
    repository: string,
    starting_date: string,
    ending_date: string|null,
    project_id: string,
    modules: Module[]
}

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  standalone: true,
  styleUrls: ['./projectdetails.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
})
export class ProjectdetailsComponent implements OnInit {
  ngOnInit(): void{
    this.activatedRoute.paramMap.subscribe(params =>{
      this.projectId=params.get('id');
      this.projectService.getProject(this.projectId).subscribe(res=>{
        console.log(res);
        // this.project=res.details;
        this.project=this.formatDates(res.details);
        // console.log(this.project);
      })

    })
  }

  formatDates(project: Project): Project {
    const convertDateToLocalTime = (dateString: string): string => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };
  
    project.starting_date = convertDateToLocalTime(project.starting_date);
    if (project.ending_date) {
      project.ending_date =convertDateToLocalTime(project.ending_date);
    }
    else{
      project.ending_date = "present"
    }
    
  
    project.modules.forEach((module) => {
      var index=0;
      module.users.forEach((user)=>{
        if(user.role==='team_lead'){
          module.team_lead=user;
          module.users.splice(index, 1);
        }
        user.works.starting_date = convertDateToLocalTime(user.works.starting_date);
        if (user.works.ending_date) {
          user.works.ending_date = convertDateToLocalTime(user.works.ending_date);
        }
        else{
          user.works.ending_date="Currently Working"
        }
        index++;
      })
    });
  
    return project;
  }

  goBack(){
    console.log("bo back");
    this.location.back();
  }

  projectId: string|null="";
  constructor(public activatedRoute: ActivatedRoute, private projectService:ProjectService, public location:Location){}

  project!:Project;
}
