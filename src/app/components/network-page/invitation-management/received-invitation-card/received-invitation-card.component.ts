import { Component, Input } from '@angular/core';
import { ReceiveInvitaion } from '../../../../../shared/models/invitation.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NetworkService } from '../../../../services/network.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-received-invitation-card',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './received-invitation-card.component.html',
  styleUrl: './received-invitation-card.component.css',
})
export class ReceivedInvitationCardComponent {
  @Input({ required: true }) invitation: ReceiveInvitaion | null = null;
  buttonClicked: boolean = false;
  responseMessage: string = '';

  constructor(
    private networkService: NetworkService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    console.log(this.invitation);
  }

  acceptInvitation() {
    this.networkService
      .accpetInvitation(this.invitation!.id)
      .pipe(
        catchError(error => {
          console.error(error);
          this.snackBar.open('Có lỗi xảy ra, vui lòng thử lại sau!', 'Đóng', {
            duration: 2000,
          });
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(() => {
        this.buttonClicked = true;
        this.responseMessage = 'Kết bạn thành công!';
      });
  }

  declineInvitation() {
    this.networkService
      .declineInvitation(this.invitation!.id)
      .pipe(
        catchError(error => {
          console.error(error);
          this.snackBar.open('Có lỗi xảy ra, vui lòng thử lại sau!', 'Đóng', {
            duration: 2000,
          });
          return throwError(() => new Error(error.error));
        })
      )
      .subscribe(() => {
        this.buttonClicked = true;
        this.responseMessage = 'Hủy yêu cầu kết bạn thành công!';
      });
  }
}
