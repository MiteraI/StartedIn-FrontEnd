import { Component } from '@angular/core';
import { ReceiveInvitaion } from '../../../../../shared/models/invitation.model';
import { CommonModule } from '@angular/common';
import { NetworkService } from '../../../../services/network.service';
import { ReplaySubject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'app-received-invitation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './received-invitation.component.html',
  styleUrl: './received-invitation.component.css',
})
export class ReceivedInvitationComponent {
  invitations: ReceiveInvitaion[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  finished: boolean = false;
  endOfList: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(private networkService: NetworkService) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  toggleLoading = () => (this.finished = !this.finished);

  loadData() {
    this.networkService.getReceivedInvitations(this.currentPage, this.itemsPerPage).subscribe({
      next: response => (this.invitations = response),
      error: error => {
        console.error(error);
        this.endOfList = true;
      },
      complete: () => this.toggleLoading(),
    });
  }

  appendData() {
    this.toggleLoading();
    this.networkService
      .getReceivedInvitations(this.currentPage, this.itemsPerPage)
      .pipe(
        takeUntil(this.destroyed$),
        catchError(error => {
          console.error(error);
          this.endOfList = true;
          return [];
        })
      )
      .subscribe({
        next: response => (this.invitations = [...this.invitations, ...response]),
        complete: () => this.toggleLoading(),
      });
  }

  onScroll() {
    if (this.endOfList) return;
    this.currentPage++;
    this.appendData();
  }
}
