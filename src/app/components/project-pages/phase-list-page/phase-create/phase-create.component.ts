import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { PhaseCreateModel } from '../../../../../shared/models/project/phase-create.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'phase-create',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule, ClickOutsideDirective, A11yModule],
  templateUrl: './phase-create.component.html',
  styleUrl: './phase-create.component.css'
})
export class PhaseCreateComponent {
  @Output() phaseSubmit = new EventEmitter<PhaseCreateModel>();
  isModalOpen: boolean = false;

  phaseCreateForm: FormGroup;
  phase: PhaseCreateModel = {
    position: 0,
    phaseName: "",
    projectId: ""
  };

  constructor(private formBuilder: FormBuilder) {
    this.phaseCreateForm = formBuilder.group({phaseName: ['', Validators.required]})
  }

  ngOnInit() {
    this.initPhase();
  }

  initPhase() {
    this.phase = {
      position: 0,
      phaseName: "",
      projectId: ""
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
    this.phase.phaseName = this.phaseCreateForm.get('phaseName')?.value;
    this.phaseSubmit.emit(this.phase);
    this.isModalOpen = false;
    this.initPhase();
    this.phaseCreateForm.reset()
  }
}
