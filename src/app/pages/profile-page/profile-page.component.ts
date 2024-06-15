import { Component } from '@angular/core';
import { ProfileDetailComponent } from '../../components/profile-page/profile-detail/profile-detail.component';
import { AccountService } from '../../core/auth/account.service';
import { CommonModule } from '@angular/common';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Account } from '../../core/auth/account.model';
import { ProfileService } from '../../services/profile.service';
import { AccountProfile } from '../../../shared/models/profile/profileDetail.model';
import { FullProfileDetail } from '../../../shared/models/profile/fullProfileDetail.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileDetailComponent, CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  account: Account | null = null;
  profile: AccountProfile | null = null;
  fullProfile: FullProfileDetail | null = null;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private accountService: AccountService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.refreshNeeded$.subscribe(() => {
      this.getFullProfile();
    });
    this.getFullProfile();
  }

  private getFullProfile() {
    this.accountService.account$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(account => (this.account = account));

    this.profileService.getProfile().subscribe(profile => {
      this.profile = profile;
      this.fullProfile = this.profileService.mapToFullProfileDetail(this.account!, this.profile);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
