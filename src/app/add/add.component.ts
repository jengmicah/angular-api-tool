import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { JobPost } from '../job-post';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  faTimes = faTimes;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('editor') editor: JsonEditorComponent;

  showData;
  options = new JsonEditorOptions();
  data: any = {
    "metadata": {
      "output": {
        "squeezenet:4dcf107": {
          "0": "{\"boxes\": [[[0, 0.36453497409820557, 0.4723466634750366, 0.42795300483703613]], [[0.1828286200761795, 0.3654136657714844, 0.47036081552505493, 0.4266101121902466]]], \"scores\": [[0.34061044454574585], [0.31779828667640686]], \"classes\": [[0], [0]], \"num_detections\": [1, 1]}",
          "120": "{\"boxes\": [[[0.18763114511966705, 0.3640512228012085, 0.4683447480201721, 0.417728066444397]], [[0.1894780844449997, 0.36342841386795044, 0.4693613648414612, 0.4182714819908142]]], \"scores\": [[0.3048851191997528], [0.30213308334350586]], \"classes\": [[0], [0]], \"num_detections\": [1, 1]}"
      }
    },
    "model_name": "squeezeNet_deeperDSSD_face_TFv1.8_296x296_01162019",
    "signedUrls": [
      "https://videointelligenceservice.blob.core.windows.net/videos/foobar/boston-marathon-mobile-2.mp4?sp=r&st=2020-04-23T20:46:18Z&se=2020-07-09T04:46:18Z&spr=https&sv=2019-02-02&sr=b&sig=5fa%2FdxnMqAGsXsDkAi9pnVWuZvevhKODt95jr6jzEig%3D"
    ],
    "jobID": "4326d79"
    },
    "mediatype": "V",
    "generatortype": "squeezenet"
  };
  form: FormGroup;
  // postData = [];

  constructor(private dataService: DataService, public dialogRef: MatDialogRef<AddComponent>,
    private fb: FormBuilder) {
    this.options.language = 'en';
    this.options.mode = 'code';this.options.modes = ['code', 'text', 'tree', 'view'];
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
  addEntry() {
    let postData = this.form.value.postData;
    this.dataService.sendPostRequest('/', postData).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      this.onNoClick();
      console.log(res);
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void { }

}
