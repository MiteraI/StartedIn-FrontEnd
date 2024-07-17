export interface PostDetail {
  id: string,
  userId: string,
  userImgUrl: Date | null,
  userFullName: string,
  createdTime: string,
  lastUpdatedTime: string,
  content: string,
  postImgUrl: string[],
  commentCount: number,
  interactionCount: number
}
