import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  content = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt molestiae repellendus, impedit beatae quod explicabo est cum molestias atque. Officia unde, doloremque sapiente accusamus eum corrupti odio maiores maxime? Culpa.";
  expanded = false;


}
