import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit {
  faTimes = faTimes;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('editor') editor: JsonEditorComponent;

  showData;
  options = new JsonEditorOptions();
  // Defaut JSON value for JSONEditor
  data: any = {
    "metadata": {
      "output": {
        "squeezenet:4dcf107": {
          "0": "{\"boxes\": [[[0, 0.36453497409820557, 0.4723466634750366, 0.42795300483703613]], [[0.1828286200761795, 0.3654136657714844, 0.47036081552505493, 0.4266101121902466]]], \"scores\": [[0.34061044454574585], [0.31779828667640686]], \"classes\": [[0], [0]], \"num_detections\": [1, 1]}",
        }
      },
      "model_name": "squeezeNet_deeperDSSD_face_TFv1.8_296x296_01162019",
      "signedUrls": [
        "https://videointelligenceservice.blob.core.windows.net/videos/foobar/boston-marathon-mobile-2.mp4?sp=r&st=2020-04-23T20:46:18Z&se=2020-07-09T04:46:18Z&spr=https&sv=2019-02-02&sr=b&sig=5fa%2FdxnMqAGsXsDkAi9pnVWuZvevhKODt95jr6jzEig%3D"
      ],
      "jobID": "4326d79"
    },
    "mediatype": "V"
  };
  form: FormGroup;

  constructor(private dataService: DataService, public dialogRef: MatDialogRef<ModalAddComponent>,
    private fb: FormBuilder) {
    this.options.language = 'en';
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = false;
    this.form = this.fb.group({
      postData: [this.data]
    });
  }

  showJson(d) {
    return JSON.stringify(d, null, 2);
  }
  changeLog(event = null) {
    this.showData = this.editor.get();
  }
  /**
   * Send POST request using DataService
   */
  addEntry() {
    let postData = this.form.value.postData;
    this.dataService.sendPostRequest('/', postData).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      this.onNoClick();
      // console.log(res);
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void { }

}
