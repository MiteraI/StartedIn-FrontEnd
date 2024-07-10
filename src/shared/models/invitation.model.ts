export interface ReceiveInvitaion {
  id: string;
  senderName: string;
  profilePicture: string | null;
  time: Date;
}

export interface SendInvitaion {
  id: string;
  receiverName: string;
  profilePicture: string | null;
  time: Date;
}

export interface ConnectedUser {
  id: string;
  userId: string;
  connectedUserName: string;
  profilePicture: string | null;
}
