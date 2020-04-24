import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JobSingle } from '../job-single';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  faTimes = faTimes;
  
  constructor(
    public dialogRef: MatDialogRef<VideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobSingle) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
