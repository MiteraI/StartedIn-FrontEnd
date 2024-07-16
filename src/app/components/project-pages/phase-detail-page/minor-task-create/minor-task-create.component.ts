import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { MinorTaskCreateModel } from '../../../../../shared/models/task/minor-task-create.model';

@Component({
  selector: 'minor-task-create',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, ClickOutsideDirective, A11yModule],
  templateUrl: './minor-task-create.component.html',
  styleUrl: './minor-task-create.component.css'
})
export class MinorTaskCreateComponent {
  @Output() taskSubmit = new EventEmitter<MinorTaskCreateModel>();
  isModalOpen: boolean = false;

  minorTaskCreateForm: FormGroup;
  minorTask: MinorTaskCreateModel = {
    position: 0,
    taskboardId: "",
    taskTitle: "",
    description: ""
  }

  constructor(private formBuilder: FormBuilder) {
    this.minorTaskCreateForm = formBuilder.group({taskTitle: ['', Validators.required]})
  }

  ngOnInit() {
    this.initMinorTask();
  }

  initMinorTask() {
    this.minorTask = {
      position: 0,
      taskboardId: "",
      taskTitle: "",
      description: ""
    }
  }

  showModal(event: Event) {
    this.isModalOpen = true;
    event.stopPropagation();
  }

  hideModal() {
    if (!this.isModalOpen) {
      return;
    }
    this.isModalOpen = false;
  }

  onSubmit() {
    this.minorTask.taskTitle = this.minorTaskCreateForm.get('taskTitle')?.value;
    this.taskSubmit.emit(this.minorTask);
    this.isModalOpen = false;
    this.initMinorTask();
    this.minorTaskCreateForm.reset();
  }
}
