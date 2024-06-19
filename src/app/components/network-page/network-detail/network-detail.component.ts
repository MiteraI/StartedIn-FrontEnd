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
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(private networkService: NetworkService) {
    const profile: Profile = {
      image: 'https://randomuser.me/api/portraits/men/79.jpg',
      backgroundImage:
        'https://img.freepik.com/free-photo/gradient-dark-blue-futuristic-digital-background_53876-160646.jpg?w=1380&t=st=1717306890~exp=1717307490~hmac=a676596a0d8dce4d7b9f3ee380d74a07e547d990bc93898763d6300420e7663d',
      name: 'John Doe',
      detail: 'Software Engineer',
      numberConnections: 500,
    };
    this.profiles = new Array<Profile>(12).fill(profile, 0, 12);
    console.log(this.profiles);
  }

  toggleLoading = () => this.finished = !this.finished;

  ngOnInit(): void {
    this.loadData();
    console.log(this.networkDetails);
  }

  loadData() {
    this.toggleLoading();
    this.networkService.getNetworkProfiles(this.currentPage, this.itemsPerPage).subscribe({
      next: response => this.networkDetails = response,
      error: error => console.error(error),
      complete: () => this.toggleLoading(),
    });
  }

  // this method will append the new data to the existing data
  appendData() {
    this.toggleLoading();
    this.networkService.getNetworkProfiles(this.currentPage, this.itemsPerPage).subscribe({
      next: response => (this.networkDetails = [...this.networkDetails, ...response]),
      error: error => console.error(error),
      complete: () => this.toggleLoading(),
    });
  }


  onScroll() {
    this.currentPage++;
    this.appendData();
    console.log(this.networkDetails);
  }
}
