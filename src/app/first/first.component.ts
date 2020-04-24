import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { JobAll } from '../job-all';
import { JobSingle } from '../job-single';
import { MatDialog } from '@angular/material/dialog';
import { VideoComponent } from '../video/video.component';
import { AddComponent } from '../add/add.component';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  jobs: JobAll[] = [];
  singleJob: JobSingle;
  form: FormGroup;
  classnum = [];

  constructor(private dataService: DataService, public dialog: MatDialog, private fb: FormBuilder) {
    this.form = this.fb.group({
      classnum: ['']
    });
  }

  /* HTTP Client Requests using DataService */
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
  getFilteredClass(classnum: string) {
    this.dataService.sendGetRequest('?classnum=' + classnum).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      this.jobs = res.body.response;
      console.log(this.jobs);
    });
  }

  /* Instantiate Video Component in popup */
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
  /* Instantiate Add Component in popup */
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
  /* Handle Query Parameter Requests */
  queryParamSubmit() {
    if(this.form.value.classnum !== "") {
      this.getFilteredClass(this.form.value.classnum);
    } else {
      this.getAll();
    }
  }
  ngOnInit() {
    this.getAll();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe(); // Unsubscribe from the subject
  }
}