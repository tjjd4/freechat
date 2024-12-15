export interface User {
  id: number;
  name: string;
};

export interface FriendPair {
  user_id: number;
  friend_id: number;
  name: string;
};