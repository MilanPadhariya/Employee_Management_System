import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LeaveService } from 'src/app/services/leave/leave.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-approveleave',
  templateUrl: 'approveleave.component.html',
  standalone: true,
  imports: [MatTableModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ]
})

export class  ApproveleaveComponent implements OnInit{
  constructor(private leaveService: LeaveService, private langServices:LanguageService){}

  ngOnInit(): void {
    this.getLeaves();
  }

  @Output() newItemEvent = new EventEmitter<string>();
  
  leaves:any[]=[];
  getLeaves():void{
    this.leaveService.getLeavedForAppoval().subscribe(res=>{
      this.leaves=this.formatDates(res.data);
      this.leaveService.leaveNotification$.next(res.data.length);
    })
  }

  formatDates(data:any) {
		return data.map((item:any) => {
		  const startDate = new Date(item.start_date).toLocaleDateString('en-US');
		  const endDate = new Date(item.end_date).toLocaleDateString('en-US');
		  const approvalDate = item.approval_date ? new Date(item.approval_date).toLocaleDateString('en-US') : null;
	  
		  return {
			...item,
			start_date: startDate,
			end_date: endDate,
			approval_date: approvalDate,
		  };
		});
	}

  onButtonClick = (event: Event, eventData: any,action:boolean) => { 
    console.log(eventData ,"action:",action);
    this.leaveService.leaveAction({"approval":action},eventData.leave_id).subscribe(res=>{
      console.log(res);
      this.getLeaves();
    })
  }

  displayedColumns: string[] = ['employee','name', 'start', 'end','approve','deny'];
  
}