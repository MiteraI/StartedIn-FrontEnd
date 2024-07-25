import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MinorTask } from '../../../../shared/models/task/minor-task.model';

@Component({
  selector: 'app-minor-task-list-dialog',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './minor-task-list-dialog.component.html',
  styleUrl: './minor-task-list-dialog.component.css'
})
export class MinorTaskListDialogComponent {
  shownList: MinorTask[] = [];
  keyword: string = "";

  constructor(
    private dialogRef: MatDialogRef<MinorTaskListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MinorTask[]
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
