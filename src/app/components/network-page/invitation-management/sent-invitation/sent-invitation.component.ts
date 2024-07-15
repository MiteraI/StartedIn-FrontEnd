import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NetworkService } from '../../../../services/network.service';
import { SendInvitaion } from '../../../../../shared/models/invitation.model';
import { SentInvitationCardComponent } from '../sent-invitation-card/sent-invitation-card.component';

@Component({
  selector: 'app-sent-invitation',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    InfiniteScrollModule,
    MatProgressSpinner,
    SentInvitationCardComponent,
  ],
  templateUrl: './sent-invitation.component.html',
  styleUrl: './sent-invitation.component.css',
})
export class SentInvitationComponent {
  invitations: SendInvitaion[] = [];
  finished: boolean = false;
  endOfList: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  buttonClicked: boolean = false;

  constructor(private networkService: NetworkService) {}

  ngOnInit() {
    this.toggleLoading();
    this.loadData();
  }

  toggleLoading = () => (this.finished = !this.finished);

  loadData() {
    this.networkService.getSentInvitations(this.currentPage, this.itemsPerPage).subscribe({
      next: response => {
        this.invitations = response;
        if (response.length < this.itemsPerPage) {
          this.endOfList = true;
        }
      },
      error: error => {
        console.error(error);
        this.endOfList = true;
      },
      complete: () => this.toggleLoading(),
    });
  }

  appendData() {
    this.toggleLoading();
    this.networkService.getSentInvitations(this.currentPage, this.itemsPerPage).subscribe({
      next: response => {
        this.invitations = [...this.invitations, ...response];
        if (response.length < this.itemsPerPage) {
          this.endOfList = true;
        }
      },
      error: error => {
        console.error(error);
        this.endOfList = true;
      },
      complete: () => this.toggleLoading(),
    });
  }

  onScroll() {
    if (this.endOfList) return;
    this.currentPage++;
    this.appendData();
  }
}
