import { Component } from '@angular/core';
import { ProfileDetailComponent } from '../../components/profile-page/profile-detail/profile-detail.component';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { AccountProfile } from '../../../shared/models/profile/profileDetail.model';
import { ReplaySubject, takeUntil } from 'rxjs';
import { AccountService } from '../../core/auth/account.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileDetailComponent, CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  profile: AccountProfile | null = null;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private profileService: ProfileService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.profileService.refreshNeeded$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.accountService.identity().subscribe(() => {});
      this.getFullProfile();
    });
    this.getFullProfile();
  }

  private getFullProfile() {
    this.profileService
      .getProfile()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
