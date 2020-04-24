import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { JobAll } from '../job-all';
import { JobSingle } from '../job-single';
import { DialogData } from '../dialogData';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideoComponent } from '../video/video.component';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit, OnDestroy {
  jobs: JobAll[] = [];
  singleJob: JobSingle;
  destroy$: Subject<boolean> = new Subject<boolean>();

  animal: string;
  name: string;

  constructor(private dataService: DataService,
              public dialog: MatDialog
  ) { }

  getAll() {
    this.dataService.sendGetRequest('/').pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      this.jobs = res.body.response;
      console.log(this.jobs);
    })
  }
  getSingle(jobid: string) {
    this.dataService.sendGetRequest('/' + jobid).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      this.singleJob = res.body.response;
      console.log(this.singleJob);
    })
  }
  videoPopup(jobid: string) {
    this.dataService.sendGetRequest('/' + jobid).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      this.singleJob = res.body.response[0];
      console.log(this.singleJob);
      const dialogRef = this.dialog.open(VideoComponent, {
        width: '100%',
        height: '100%',
        data: this.singleJob,
        // data: {
        //   generatortype: this.singleJob.generatortype,
        //   metadata: this.singleJob.metadata,
        //   jobdetails: this.singleJob.jobdetails,
        // },
        disableClose: true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    })
  }
  addPopup() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '90%',
      height: '90%',
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAll();
    });
  }
   
  ngOnInit() {
    this.getAll();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe(); // Unsubscribe from the subject
  }
}