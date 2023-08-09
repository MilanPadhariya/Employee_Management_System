import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { 
	NgbAlertModule,
	NgbDatepickerModule,
	NgbDateStruct 
} from '@ng-bootstrap/ng-bootstrap';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { TeamService } from 'src/app/services/team/team.service';

interface Team{
  name: string;
  team_id: string;
}

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  standalone: true,
  styleUrls:['./adduser.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    NgbDatepickerModule, 
		NgbAlertModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AdduserComponent implements OnInit {
  constructor(private employeeService:EmployeeService,private teamService:TeamService){}
  addUserForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
    this.getTeams();
  }

  teams:Team[]=[];
  getTeams():void{
    this.teamService.getAllTeams().subscribe(res=>{
      // console.log(res.data);
      this.teams=res.data;
    })
  }

  initForm():void{
    this.addUserForm=new FormGroup({
      name:new FormControl("", [Validators.required]),
      role:new FormControl("", [Validators.required]),
      dob:new FormControl("", [Validators.required]),
      gender:new FormControl("",[Validators.required]),
      email:new FormControl("", [Validators.required, Validators.email]),
      phonenumber:new FormControl("", [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('^[0-9]+$')]),
      password:new FormControl("", [Validators.required,Validators.minLength(8)]),
      team:new FormControl("", [Validators.required])
    })
  }
  // get f(){return this.addUserForm.controls}

  get name():FormControl{
		return this.addUserForm.get('name') as FormControl;
	}
  get role():FormControl{
		return this.addUserForm.get('role') as FormControl;
	}
  get dob():FormControl{
		return this.addUserForm.get('dob') as FormControl;
	}
  get gender():FormControl{
		return this.addUserForm.get('gender') as FormControl;
	}
  get email():FormControl{
		return this.addUserForm.get('email') as FormControl;
	}
  get phonenumber():FormControl{
		return this.addUserForm.get('phonenumber') as FormControl;
	}
  get password():FormControl{
		return this.addUserForm.get('password') as FormControl;
	}
  get team():FormControl{
    return this.addUserForm.get('team') as FormControl;
  }
  startingDateModel!: NgbDateStruct;

  submitHandler():void{
    if(this.addUserForm.valid){
      this.employeeService.addUser(this.addUserForm.value).subscribe(res=>{
        console.log(res);
        if(res.message){
          alert(res.message);
        }
        this.initForm()
      })
    }
  }

}
