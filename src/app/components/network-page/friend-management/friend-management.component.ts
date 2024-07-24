import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ConnectedUser } from '../../../../shared/models/invitation.model';
import { NetworkService } from '../../../services/network.service';
import { FriendManagementCardComponent } from './friend-management-card/friend-management-card.component';

@Component({
  selector: 'app-friend-management',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    InfiniteScrollModule,
    MatProgressSpinner,
    FriendManagementCardComponent,
  ],
  templateUrl: './friend-management.component.html',
  styleUrl: './friend-management.component.css',
})
export class FriendManagementComponent {
  connectedUsers: ConnectedUser[] = [];
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
    this.networkService.getUserConnectionList(this.currentPage, this.itemsPerPage).subscribe({
      next: response => {
        this.connectedUsers = response;
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
    this.networkService.getUserConnectionList(this.currentPage, this.itemsPerPage).subscribe({
      next: response => {
        this.connectedUsers = [...this.connectedUsers, ...response];
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
