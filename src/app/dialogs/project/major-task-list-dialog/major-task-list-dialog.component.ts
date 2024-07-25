import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MajorTaskBasicInfo } from '../../../../shared/models/task/major-task-basic-info.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-major-task-list-dialog',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './major-task-list-dialog.component.html',
  styleUrl: './major-task-list-dialog.component.css'
})
export class MajorTaskListDialogComponent {
  shownList: MajorTaskBasicInfo[] = [];
  keyword: string = "";

  constructor(
    private dialogRef: MatDialogRef<MajorTaskListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MajorTaskBasicInfo[]
  ) {}

  ngOnInit() {
    this.shownList = this.data;
  }

  search() {
    this.shownList = this.data.filter(m => m.taskTitle.toLocaleLowerCase().includes(this.keyword.toLocaleLowerCase()));
  }

  submit(id: string) {
    this.dialogRef.close(id);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
