import { Component } from '@angular/core';
import { MiniTaskItemComponent } from '../mini-task-item/mini-task-item.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'taskboard',
  standalone: true,
  imports: [MiniTaskItemComponent, MatIconModule],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.css'
})
export class TaskboardComponent {

}
