import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NetworkService } from '../../services/network.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ConnectedUser } from '../../../shared/models/invitation.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { map } from 'rxjs';

@Component({
  selector: 'app-team-invite-dialog',
  standalone: true,
  imports: [MatDialogModule, MatTableModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './team-invite-dialog.component.html',
  styleUrl: './team-invite-dialog.component.css',
})
export class TeamInviteDialogComponent implements OnInit {
  displayedColumns: string[] = ['select', 'connectedUserName', 'email'];
  dataSource: MatTableDataSource<ConnectedUser> = new MatTableDataSource<ConnectedUser>([]);
  selection = new SelectionModel<ConnectedUser>(true, []);

  constructor(
    private dialogRef: MatDialogRef<TeamInviteDialogComponent, string[]>,
    @Inject(MAT_DIALOG_DATA) private existingUsers: string[],
    private networkService: NetworkService
  ) {}

  ngOnInit(): void {
    this.networkService
      .getUserConnectionList()
      .pipe(
        map((connectedUsers: ConnectedUser[]) =>
          connectedUsers.filter(user => !this.existingUsers.includes(user.connectedUserName))
        )
      )
      .subscribe((filteredUsers: ConnectedUser[]) => {
        this.dataSource = new MatTableDataSource<ConnectedUser>(filteredUsers);
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: ConnectedUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} ${row.connectedUserName}`;
  }

  inviteMembers() {
    const selectedEmails = this.selection.selected.map(user => user.email);
    // Send selectedEmails to your backend
    this.dialogRef.close(selectedEmails);
  }
}
