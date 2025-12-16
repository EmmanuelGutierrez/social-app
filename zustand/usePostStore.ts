import { create } from "zustand";

type postStore = {
  newPostsData: {
    postId: string;
    authorId: string;
    authorUsername: string;
    authorProfileImg: string;
    followerId: string;
  }[];
  notification: { authorProfileImg: string; authorId: string }[];
  setNewPostsData: (
    newPostsData: {
      postId: string;
      authorId: string;
      authorUsername: string;
      authorProfileImg: string;
      followerId: string;
    }[]
  ) => void;
  setNotification: (
    notification: { authorProfileImg: string; authorId: string }[]
  ) => void;
};

export const usePostStore = create<postStore>((set) => ({
  newPostsData: [],
  notification: [],
  setNewPostsData: (
    newPostsData: {
      postId: string;
      authorId: string;
      authorUsername: string;
      authorProfileImg: string;
      followerId: string;
    }[]
  ) => set({ newPostsData }),
  setNotification: (
    notification: { authorProfileImg: string; authorId: string }[]
  ) => set({ notification }),
}));
