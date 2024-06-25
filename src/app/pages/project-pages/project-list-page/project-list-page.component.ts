import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectCardComponent } from '../../../components/project-pages/project-list-page/project-card/project-card.component';

@Component({
  selector: 'app-project-list-page',
  standalone: true,
  imports: [MatIconModule, CommonModule, ProjectCardComponent],
  templateUrl: './project-list-page.component.html',
  styleUrl: './project-list-page.component.css'
})
export class ProjectListPageComponent {
  list = ['CarGo', 'WhatEat', 'UniTogether', 'BHealthy'];
}
