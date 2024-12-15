import { FriendPair } from "../types/types";

export const getFriendList = async (): Promise<FriendPair[] | null> => {
  try {
    const response = await fetch('http://localhost:3000/users/friends', {
        method: 'GET',
        credentials: 'include',
    });

    if (response.ok) {
        const res = await response.json();

        if (res.success) {
          return res.data;
        } else {
          return null;
        }
    } else {
        return null;
    }
  } catch (error) {
    throw error;
  }
};
