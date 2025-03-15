export interface Like {
    id: number;
    userId: number;
    postId: number | null;
    commentId: number | null;
    createdAt: Date;
  }