import { Component } from '@angular/core';
import { Profile } from '../../../../shared/models/network-profile.model';
import { NetworkProfileCardComponent } from '../network-profile-card/network-profile-card.component';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NetworkService } from '../../../services/network.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountProfile } from '../../../../shared/models/profile/profileDetail.model';

@Component({
  selector: 'app-network-detail',
  standalone: true,
  imports: [
    NetworkProfileCardComponent,
    CommonModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './network-detail.component.html',
  styleUrl: './network-detail.component.css',
})
export class NetworkDetailComponent {
  profiles: Profile[] = [];
  networkDetails: AccountProfile[] = new Array<AccountProfile>();
  finished: boolean = false;
  endOfList: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(private networkService: NetworkService) {
  }

  toggleLoading = () => (this.finished = !this.finished);

  ngOnInit(): void {
    this.loadData();
    this.toggleLoading();
  }

  loadData() {
    this.toggleLoading();
    this.networkService.getNetworkProfiles(this.currentPage, this.itemsPerPage).subscribe({
      next: response => (this.networkDetails = response),
      error: error => {
        console.error(error);
        this.endOfList = true;
      },
      complete: () => this.toggleLoading(),
    });
  }

  // this method will append the new data to the existing data
  appendData() {
    this.toggleLoading();
    this.networkService.getNetworkProfiles(this.currentPage, this.itemsPerPage).subscribe({
      next: response => (this.networkDetails = [...this.networkDetails, ...response]),
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
