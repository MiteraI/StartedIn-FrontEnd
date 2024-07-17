import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MajorTaskCreateModel } from '../../../../../shared/models/task/major-task-create.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'major-task-create',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, ClickOutsideDirective, A11yModule],
  templateUrl: './major-task-create.component.html',
  styleUrl: './major-task-create.component.css'
})
export class MajorTaskCreateComponent {
  @Output() taskSubmit = new EventEmitter<MajorTaskCreateModel>();
  isModalOpen: boolean = false;

  majorTaskCreateForm: FormGroup;
  majorTask: MajorTaskCreateModel = {
    position: 0,
    phaseId: "",
    taskTitle: "",
    description: ""
  }

  constructor(private formBuilder: FormBuilder) {
    this.majorTaskCreateForm = formBuilder.group({taskTitle: ['', Validators.required]})
  }

  ngOnInit() {
    this.initMajorTask();
  }

  initMajorTask() {
    this.majorTask = {
      position: 0,
      phaseId: "",
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
    this.majorTask.taskTitle = this.majorTaskCreateForm.get('taskTitle')?.value;
    this.taskSubmit.emit(this.majorTask);
    this.isModalOpen = false;
    this.initMajorTask();
    this.majorTaskCreateForm.reset();
  }
}
