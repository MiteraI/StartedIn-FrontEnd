import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { TeamService } from '../../../../services/team.service';
import { CreateTeamRequest } from '../../../../../shared/models/project/team/create-team-request.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProjectTeam } from '../../../../../shared/models/project/project-team.model';

@Component({
  selector: 'app-create-team-button',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideDirective,
    MatSnackBarModule,
  ],
  templateUrl: './create-team-button.component.html',
  styleUrl: './create-team-button.component.css',
})
export class CreateTeamButtonComponent {
  @Output() teamCreateSubmit = new EventEmitter<ProjectTeam>();
  dialogOpen: boolean = false;
  teamCreateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private snackBar: MatSnackBar
  ) {
    this.teamCreateForm = formBuilder.group({ teamName: ['', Validators.required] });
  }

  openDialog(event: Event): void {
    event.stopPropagation();
    this.dialogOpen = true;
  }

  closeDialog(): void {
    if (!this.dialogOpen) {
      return;
    }
    this.dialogOpen = false;
  }

  onSubmit(): void {
    let teamName = this.teamCreateForm.get('teamName')?.value;
    if (teamName) {
      let createTeam: CreateTeamRequest = {
        team: {
          teamName: teamName,
          description: '',
        },
        project: {
          projectName: teamName,
        },
      };
      console.log(createTeam);
      let createdTeam: ProjectTeam = {
        id: '',
        description: '',
        teamName: createTeam.team.teamName,
        projects: [
          {
            id: '',
            projectName: createTeam.team.teamName,
          },
        ],
      };
      this.teamCreateSubmit.emit(createdTeam);
      return;
    }
    this.snackBar.open('Tạo team phải có tên team!', 'Đóng', { duration: 3000 });
  }
}
