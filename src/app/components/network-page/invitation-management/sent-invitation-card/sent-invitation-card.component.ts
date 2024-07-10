import { Component, Input } from '@angular/core';
import { SendInvitaion } from '../../../../../shared/models/invitation.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NetworkService } from '../../../../services/network.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-sent-invitation-card',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './sent-invitation-card.component.html',
  styleUrl: './sent-invitation-card.component.css',
})
export class SentInvitationCardComponent {
  @Input({ required: true }) invitation: SendInvitaion | null = null;
  buttonClicked: boolean = false;
  responseMessage: string = '';

  constructor(
    private networkService: NetworkService,
    private snackbar: MatSnackBar
  ) {}

  cancelInvitation() {
    this.networkService
      .declineInvitation(this.invitation!.id)
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
