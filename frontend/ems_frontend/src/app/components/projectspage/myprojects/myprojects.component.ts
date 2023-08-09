import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgFor, NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ProjectService } from 'src/app/services/project/project.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.css'],
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [CommonModule,MatButtonModule,MatIconModule,MatTableModule,NgFor,NgIf,RouterModule,TranslateModule],
})

export class MyprojectsComponent implements OnInit {
  ngOnInit(
  ){}
  dataSource = [];
  columnsToDisplay = ['Name', 'company', 'starting_date', 'ending_date'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,'expand'];
  expandedElement: null | undefined;
  
  constructor(private projectService: ProjectService){
    this.getProjects();
  }
  
  getProjects(): void {
    this.projectService.getMyProjects().subscribe(res=>{
      this.dataSource=this.formatDates(res.modules);
      console.log("result of api in MyLeave component:",res.modules);
    })
  }

  formatDates(data:any) {
    return data.map((item:any) => {
      const startDate = new Date(item.project.starting_date).toLocaleDateString('en-US');
      const endDate = item.ending_date ? new Date(item.project.ending_date).toLocaleDateString('en-US'): "the Project is Current Going ON";
      const joiningDate = new Date(item.works.starting_date).toLocaleDateString('en-US'); 
      const leavingDate= item.works.ending_date ? new Date(item.works.ending_date).toLocaleDateString('en-US'): "You are currently working on this project";
    
      return {
        ...item,
        project:{
          ...item.project,
          starting_date: startDate,
          ending_date: endDate,
        },
        works:{
          ...item.works,
          starting_date: joiningDate,
          ending_date: leavingDate
        }
      };
    });
  }
}
