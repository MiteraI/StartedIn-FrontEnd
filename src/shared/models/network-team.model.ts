import {Profile} from './network-profile.model';

export interface Team {
  teamName: string;
  profiles: Profile[];
}