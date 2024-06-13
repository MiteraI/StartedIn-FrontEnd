export interface PostDetail {
  id: string,
  userId: string,
  userImgUrl: Date | null,
  userFullName: string,
  createdTime: Date,
  lastUpdatedTime: Date | null,
  content: string,
  postImgUrl: string[],
  commentCount: number,
  interactionCount: number
}
