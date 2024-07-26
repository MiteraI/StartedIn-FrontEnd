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
  shownList: TaskItem[] = [];
  keyword: string = "";

  constructor(
    private dialogRef: MatDialogRef<MinorTaskListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MinorTask[]
  ) {}

  ngOnInit() {
    this.shownList = this.data.map(mt => new TaskItem(mt));
  }

  search() {
    this.shownList = this.data.filter(mt => mt.taskTitle.toLocaleLowerCase().includes(this.keyword.toLocaleLowerCase())).map(mt => new TaskItem(mt));
  }

  toggleSelection(taskItem: TaskItem) {
    taskItem.selected = !taskItem.selected;
  }

  submit() {
    this.dialogRef.close(this.shownList.filter(item => item.selected).map(item => item.task.id));
  }

  onCancel() {
    this.dialogRef.close();
  }
}

class TaskItem {
  task: MinorTask;
  selected: boolean = false;

  constructor(task: MinorTask) {
    this.task = task;
  }
}
