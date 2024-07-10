import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ConnectedUser } from '../../../../../shared/models/invitation.model';
import { NetworkService } from '../../../../services/network.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-friend-management-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friend-management-card.component.html',
  styleUrl: './friend-management-card.component.css',
})
export class FriendManagementCardComponent {
  @Input({ required: true }) connectedUser: ConnectedUser | null = null;
  buttonClicked: boolean = false;
  responseMessage: string = '';

  constructor(
    private networkService: NetworkService,
    private snackbar: MatSnackBar
  ) {}

  cancelInvitation() {
    this.networkService
      .declineInvitation(this.connectedUser!.id)
      .pipe(
        catchError(error => {
          console.error(error);
          this.snackbar.open('Có lỗi xảy ra, vui lòng thử lại sau!', 'Đóng', {
            duration: 2000,
          });
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(() => {
        this.buttonClicked = true;
        this.responseMessage = 'Đã hủy lời mời!';
      });
  }
}
