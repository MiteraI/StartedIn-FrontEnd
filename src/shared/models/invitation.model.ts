export interface ReceiveInvitaion {
  id: string;
  senderName: string;
  profilePicture: string | null;
  time: string;
}

export interface SendInvitaion {
  id: string;
  receiverName: string;
  profilePicture: string | null;
  time: string;
}
