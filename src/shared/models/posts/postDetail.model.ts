export interface PostDetail {
  id: string,
  authorId: string,
  createdTime: Date,
  updatedTime: Date | null,
  content: string,
  imageUrl: string | null,
  interactionCount: number,
  commentCount: number
}
