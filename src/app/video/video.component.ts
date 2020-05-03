import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobSingle } from '../job-single';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})

export class VideoComponent implements OnInit {
  faTimes = faTimes;
  job: JobSingle;
  classes: [];
  classTimestampMap: object;
  activeIndex: number;

  constructor(
    public dialogRef: MatDialogRef<VideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobSingle
  ) {
    this.job = data;
    this.classes = this.transform(data.classfrequencies);
    this.classes.sort(function (x, y) {
      return y['value'] - x['value'];
    });
    this.classTimestampMap = this.initClassTimestampMap();
    console.log(this.classTimestampMap);
  }
  /**
   * Convert JSON to array of JSON and sort by frequency
   * @param value
   */
  transform(obj: object): any {
    let keys = [];
    for (let key in obj) {
      keys.push({ key: key, value: obj[key] });
    }
    return keys;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  initTimeline(classnum: string): void {
    if(this.classTimestampMap[classnum] !== undefined) {
      let video, sources, nav, buttons;
      video = document.querySelector('video#videoPlayer');
      sources = video.getElementsByTagName('source');
      nav = document.querySelector('nav');
      nav.innerHTML = '';

      let videoDuration = video.duration * 1000; // in milliseconds
      
      let timestamps = this.classTimestampMap[classnum];
      timestamps.forEach(ts => {
        let button = document.createElement('button');  
        let text = document.createTextNode(ts);
        button.setAttribute('mat-button','');
        button.appendChild(text);
        // button.style.padding = "5px";
        // console.log(ts / videoDuration, ts, videoDuration);
        // button.style.marginLeft = (ts / videoDuration * 100).toString();
        nav.appendChild(button);

        button.addEventListener('click', function () {
          for (let i = sources.length - 1; i >= 0; i--) {
            sources[i].setAttribute(
              'src',
              sources[i]
                .getAttribute('data-original')
                .concat('#t=' + parseInt(ts) / 1000)
            );
            video.load();
            video.play();
          }
        });
      });
    }
  }

  initClassTimestampMap(): object {
    let dict = {};
    let nodeids = this.transform(this.job.metadata);
    nodeids.forEach(nodeid_data => {
      let ts = this.transform(nodeid_data.value); // timestamps
      ts.forEach(ts_data => {
        let timestamp:string = ts_data.key;
        let classes = JSON.parse(ts_data.value).classes.flat(Infinity);
        classes.forEach(c => {
          if(dict[c] !== undefined) {
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
  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }

  ngOnInit(): void {}
}
