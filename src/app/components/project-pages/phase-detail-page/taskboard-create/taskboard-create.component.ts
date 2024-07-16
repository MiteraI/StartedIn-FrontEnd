import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { A11yModule } from '@angular/cdk/a11y';
import { TaskboardCreateModel } from '../../../../../shared/models/task/taskboard-create.model';

@Component({
  selector: 'taskboard-create',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, ClickOutsideDirective, A11yModule],
  templateUrl: './taskboard-create.component.html',
  styleUrl: './taskboard-create.component.css'
})
export class TaskboardCreateComponent {
  @Output() taskboardSubmit = new EventEmitter<TaskboardCreateModel>();
  isModalOpen: boolean = false;

  taskboardCreateForm: FormGroup;
  taskboard: TaskboardCreateModel = {
    position: 0,
    phaseId: "",
    title: ""
  };

  constructor(private formBuilder: FormBuilder) {
    this.taskboardCreateForm = formBuilder.group({title: ['', Validators.required]})
  }

  ngOnInit() {
    this.initTaskboard();
  }

  initTaskboard() {
    this.taskboard = {
      position: 0,
      phaseId: "",
      title: ""
    };
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
    this.taskboard.title = this.taskboardCreateForm.get('title')?.value;
    this.taskboardSubmit.emit(this.taskboard);
    this.isModalOpen = false;
    this.initTaskboard();
    this.taskboardCreateForm.reset()
  }
}
