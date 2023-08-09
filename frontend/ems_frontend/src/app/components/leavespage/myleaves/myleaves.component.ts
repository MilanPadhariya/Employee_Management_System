import { Component,OnInit } from '@angular/core';
import { DecimalPipe, JsonPipe, NgFor,CommonModule } from '@angular/common';
import { FormsModule,FormGroup,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { 
	NgbPaginationModule,
	NgbTypeaheadModule,
	NgbDropdownModule,
	NgbAlertModule,
	NgbDatepickerModule,
	NgbDateStruct 
} from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language/language.service';
import {TranslateModule} from '@ngx-translate/core';

import { LeaveService } from 'src/app/services/leave/leave.service';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth.service';

interface Leave{
	leave_id: string,
	start_date: string,
	end_date: string,
	approval_date:string|null
}

@Component({
	selector: 'app-myleaves',
	standalone: true,
	imports: [
		DecimalPipe, 
		NgFor, 
		FormsModule, 
		NgbTypeaheadModule, 
		NgbPaginationModule, 
		NgbDropdownModule, 
		NgbDatepickerModule, 
		NgbAlertModule,
		ReactiveFormsModule, 
		CommonModule,
		TranslateModule,
		MatTableModule,
		JsonPipe],
	templateUrl: './myleaves.component.html',
})

export class MyleavesComponent implements OnInit {
	formGroup!: FormGroup;
	ngOnInit(): void {
		this.initform();
	}
	
	initform():void{
		this.formGroup = new FormGroup({
			stDate:new FormControl('', [
				Validators.required,
				// Validators.pattern(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)
			]),
			enDate:new FormControl('', [
				Validators.required,
				// Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
			]),
		});
	}

	get enDate():FormControl{
		return this.formGroup.get('enDate') as FormControl;
	}
	
	get stDate():FormControl{
		return this.formGroup.get('stDate') as FormControl;
	}


	page = 1;
	pageSize = 4;
	startingDateModel!: NgbDateStruct;
	endingDateModel!: NgbDateStruct;
	// collectionSize = COUNTRIES.length;
	// countries: Country[]=[];

  	leaves:Leave[]=[];

	constructor( private leavesService:LeaveService,private langService:LanguageService,private authService:AuthService) {
		// this.refreshCountries();
		this.getLeaves();
		this.leavesService.leaveNotification$.subscribe(res=>{
			this.count=res
		})
	}
	displayedColumns:string[]=['id','startDate','endDate','approvalDate'];

  	getLeaves(): void {
			this.leavesService.getLeaves().subscribe(res=>{

				this.leaves=this.formatDates(res.data);
				console.log("result of api in component:",res.data);
			})
  	}

	formatDates(data:any) {
		return data.map((item:any) => {
		  const startDate = new Date(item.start_date).toLocaleDateString('en-US');
		  const endDate = new Date(item.end_date).toLocaleDateString('en-US');
		  const approvalDate = item.approval_date ? new Date(item.approval_date).toLocaleDateString('en-US') : (item.seen_by_hr&&item.seen_by_team_lead)? 'Denied':'Remaining';
	  
		  return {
			...item,
			start_date: startDate,
			end_date: endDate,
			approval_date: approvalDate,
		  };
		});
	}
	count:number=0;

	addLeave(): void {
		if(this.formGroup.valid){
			this.leavesService.addLeaves(this.formGroup.value).subscribe(res=>{
				console.log("added leave from server is:",res);
				var increment=0;
				if(res.success===true){

						this.leavesService.leaveNotification$.next(this.count+1);
				}
				this.getLeaves();
			})
		}
	}


	// refreshCountries() {
	// 	this.countries = COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
	// 		(this.page - 1) * this.pageSize,
	// 		(this.page - 1) * this.pageSize + this.pageSize,
	// 	);
	// }
}
