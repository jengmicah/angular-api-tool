import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { JobAll } from '../job-all';
import { JobSingle } from '../job-single';
import { MatDialog } from '@angular/material/dialog';
import { ModalVideoComponent } from '../modal-video/modal-video.component';
import { ModalAddComponent } from '../modal-add/modal-add.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
})
export class FirstComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  jobs: JobAll[] = [];
  singleJob: JobSingle;
  form: FormGroup;
  queryParam: string[] = [];
  selectedParam: string = 'classnum';

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      queryParam: [''],
      selectedQuery: '',
    });
  }

  /**
   * HTTP Client Requests
   */
  /* Send GET request for all jobs using DataService */
  getAll() {
    this.dataService
      .sendGetRequest('/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        this.jobs = res.body.response;
      });
  }
  /* Send GET request for a single job (by jobID) using DataService */
  getSingle(jobid: string) {
    this.dataService
      .sendGetRequest('/' + jobid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        this.singleJob = res.body.response;
      });
  }
  /* Send GET request jobs with query parameter using DataService */
  getFiltered(queryParam: string) {
    this.dataService
      .sendGetRequest('?' + this.selectedParam + '=' + queryParam)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        this.jobs = res.body.response;
      });
  }

  /**
   * Popup Handlers
   */
  /* Instantiate Video Component in popup */
  videoPopup(jobid: string) {
    this.dataService
      .sendGetRequest('/' + jobid)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        this.singleJob = res.body.response[0];
        const dialogRef = this.dialog.open(ModalVideoComponent, {
          width: '100%',
          height: '100%',
          data: this.singleJob,
          // disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result) => { });
      });
  }
  /* Instantiate Add Component in popup */
  addPopup() {
    const dialogRef = this.dialog.open(ModalAddComponent, {
      width: '90%',
      height: '90%',
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAll();
    });
  }

  /**
   * Form (Query Param) Handler
   */
  /* Handle Query Parameter Requests */
  queryParamSubmit() {
    if (this.form.value.queryParam !== '') {
      this.getFiltered(this.form.value.queryParam);
    } else {
      this.getAll();
    }
  }
  /* Event handler for the select element's change event */
  selectChangeHandler(event: any) {
    this.selectedParam = event.target.value;
  }

  /**
   * Angular Init and Destroy Functions
   */
  ngOnInit() {
    this.getAll();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe(); // Unsubscribe from the subject
  }
}
