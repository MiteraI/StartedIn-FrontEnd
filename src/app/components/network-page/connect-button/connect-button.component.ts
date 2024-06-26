import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NetworkService } from '../../../services/network.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connect-button',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './connect-button.component.html',
  styleUrl: './connect-button.component.css',
})
export class ConnectButtonComponent {
  @Input() profileId!: string;
  isConnected: boolean = false;

  constructor(private networkService: NetworkService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
  }

  toggleConnect = () => (this.isConnected = !this.isConnected);

  connect(){
    if(this.isConnected){
      return;
    }
    this.networkService
    .connectProfile(this.profileId)
    .subscribe({
      next: () => {
        this.isConnected = true;
      },
      error: error => {
        this.isConnected = false;
        this.snackBar.open('Kết nối thất bại', 'Đóng', { duration: 3000 });
        console.error(error);
      },
    });
  };
}
