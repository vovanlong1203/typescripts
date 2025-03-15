export interface Friend {
    userId: number;
    friendId: number;
    status: 'pending' | 'accepted';
    createdAt: Date;
  }