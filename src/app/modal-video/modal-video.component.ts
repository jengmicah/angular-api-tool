import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobSingle } from '../job-single';
import { Marker } from '../marker';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.css'],
})

export class ModalVideoComponent implements OnInit {
  faTimes = faTimes;
  job: JobSingle;
  classes: [];
  classTimestampMap: object;
  activeIndex: number;
  timelineMarkers: Marker[] = [];
  video: HTMLVideoElement;

  constructor(
    public dialogRef: MatDialogRef<ModalVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobSingle
  ) {
    this.job = data;
    this.classes = this.transformJSON(data.classfrequencies);
    this.classes.sort(function (x, y) { return y['value'] - x['value'] });
    this.classTimestampMap = this.initClassTimestampMap();
  }

  /**
   * Timeline-Related Function
   */
  /* Creates a map of classes to timestamps with that class so that timeline generation is quicker */
  initClassTimestampMap(): object {
    let dict = {};
    let nodeids = this.transformJSON(this.job.metadata);
    nodeids.forEach((nodeid_data) => {
      let ts = this.transformJSON(nodeid_data.value); // timestamps
      ts.forEach((ts_data) => {
        let timestamp: string = ts_data.key;
        let classes = JSON.parse(ts_data.value).classes.flat(Infinity);
        classes.forEach((c) => {
          if (dict[c] !== undefined) {
            // dict[c].push(timestamp);
            dict[c].add(timestamp);
          } else {
            // dict[c] = [timestamp];
            dict[c] = new Set(timestamp);
          }
        });
      });
    });
    return dict;
  }
  /* Populate this.timelineMarkers to generate timeline */
  initTimeline(classnum: string): void {
    this.video = document.querySelector('video#videoPlayer') as HTMLVideoElement;
    if (this.classTimestampMap[classnum] !== undefined) {
      let videoDuration = this.video.duration * 1000; // in milliseconds
      let timestamps = this.classTimestampMap[classnum];
      this.timelineMarkers = []; // Empty markers

      // Iterate through all timestamps associated with selected class
      timestamps.forEach((ts) => {
        // Push to Marker object to array with relevant values
        this.timelineMarkers.push({
          timestamp: this.convertSecToTimestamp(ts / 1000), // Tooltip value
          marginLeft: (ts / videoDuration) * 100, // Position in timeline
          seconds: ts / 1000 // Time in video to skip to
        });
      });
    }
  }

  /**
   * Helper Functions
   */
  /* Convert JSON to array of JSON */
  transformJSON(obj: object): any {
    let keys = [];
    for (let key in obj) {
      keys.push({ key: key, value: obj[key] });
    }
    return keys;
  }
  /* Close Dialog */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /* Active "Classes" index for highlighting */
  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }
  /* https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss */
  convertSecToTimestamp(sec: number): any {
    let date = new Date(0);
    date.setSeconds(sec); // specify value for SECONDS here
    let timeString = date.toISOString().substr(11, 8);
    return timeString;
  }
  ngOnInit(): void { }
}
