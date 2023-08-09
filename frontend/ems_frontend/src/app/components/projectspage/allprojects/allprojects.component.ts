import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgFor, NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ProjectService } from 'src/app/services/project/project.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule,FormGroup,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { MatSelectModule } from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';
import { ROUTES, RouterModule } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';

interface Employee{
  emp_id: string;
  name: string;
  age: number;
  role: string;
  gender: string;
  dob: string;
  ph_no: string;
  email_id:string;
  hiring_date: string;
  teamTeam_id:null;
  team_id:string
}
@Component({
  selector: 'app-allprojects',
  templateUrl: './allprojects.component.html',
  styleUrls: ['./allprojects.component.css'],
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    NgFor,
    NgIf,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    TranslateModule,
    RouterModule,
    MatChipsModule
  ],
})

export class AllprojectsComponent implements OnInit {
  ngOnInit(){
    this.initform();
  }

  initform():void{
    this.formGroup=new FormGroup({
      name:new FormControl('',[
        Validators.required,
      ]),
      company:new FormControl('',[Validators.required]),
      repository:new FormControl('',[Validators.required]),
    });

    this.addEmployeeForm=new FormGroup({
      employee:new FormControl('',[Validators.required]),
      module:new FormControl('',[Validators.required])
    });
  }

  get employee():FormControl{
    return this.addEmployeeForm.get('employee') as FormControl;
  }

  get module():FormControl{
    return this.addEmployeeForm.get('module') as FormControl;
  }

  get projectName():FormControl{
    return this.formGroup.get('name') as FormControl;
  }

  get companyName():FormControl{
    return this.formGroup.get('company') as FormControl;
  }

  get repoUrl():FormControl{
    return this.formGroup.get('repository') as FormControl;
  }


    formGroup!: FormGroup;
    addEmployeeForm!:FormGroup;
    dataSource:any[] = [];
    employees:Employee[]=[];
    columnsToDisplay = ['Name', 'company', 'starting_date', 'ending_date'];
    columnsToDisplayWithExpand = [...this.columnsToDisplay,'expand'];
    expandedElement: null | undefined;
    
    constructor(private projectService: ProjectService,private employeeService: EmployeeService){
      this.getProjects();
      this.getEmployees();
    }

    getEmployees():any{
      this.employeeService.getAllEmployees().subscribe(res=>{
        this.employees = res.data;
      });
    }
    
    getProjects(): void {
      this.projectService.getAllProjects().subscribe(res=>{
        this.dataSource=this.formatDates(res.data);
        console.log("result of api in AllProjects component:",res.data);
      })
    }

    addProjects():void{
      if(this.formGroup.valid){
        this.projectService.addProject(this.formGroup.value).subscribe(res=>{
          console.log("result of api in addProject component:",res);
          this.getProjects();
        })
      }
    }


    addEmployee(){
      console.log(this.addEmployeeForm.value);
      this.projectService.addEmployee(this.addEmployeeForm.value).subscribe(res=>{
        if(res){
          alert(res.messege);
        }
      })
    }
    formatDates(data:any) {
      return data.map((item:any) => {
        const startDate = new Date(item.starting_date).toLocaleDateString('en-US');
        const endDate = item.ending_date ? new Date(item.ending_date).toLocaleDateString('en-US'): "the Project is Current Going ON";
      
        return {
          ...item,
          starting_date: startDate,
          ending_date: endDate
        };
      });
    }

    announcer = inject(LiveAnnouncer);

    // removeKeyword(keyword: string) {
    //   const index = this.keywords.indexOf(keyword);
    //   if (index >= 0) {
    //     this.keywords.splice(index, 1);
  
    //     this.announcer.announce(`removed ${keyword}`);
    //   }
    // }
  
    add(event: MatChipInputEvent,projectId:string): void {
      console.log('hiiii')
      const value = (event.value || '').trim();
  
      // Add our keyword
      if (value) {
        let index=0;
        let selectedIndex=0;
        this.dataSource.map(project=>{
          if(project.project_id===projectId){
            selectedIndex=index
          }
          index++;
        })
        this.projectService.addModule(projectId,value).subscribe(result=>{
          if(result.success){
            this.dataSource[selectedIndex].modules.push({name:value,module_id:result.module[0].module_id});
          }
          else{
            alert("error in adding module");
          }
        })
        // this.newKeywords.push(value);
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
}