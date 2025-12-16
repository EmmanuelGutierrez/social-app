import { create } from "zustand";

interface notification {
  authorProfileImg?: string;
  authorId: string;
  authorUsername: string;
  postId: string;
}

type notificationStore = {
  newNotificationsData: notification[];
  notifications: notification[];
  setNewNotificationsData: (
    newNotificationsData: notification[] | notification
  ) => void;
  clearsetNewNotificationsData: () => void;
  setNotifications: () => void;
};

export const useNotificationStore = create<notificationStore>((set, get) => ({
  newNotificationsData: [],
  notifications: [],
  clearsetNewNotificationsData: () =>
    set({ newNotificationsData: [], notifications: [] }),
  setNewNotificationsData: (
    newNotificationsData: notification[] | notification
  ) => {
    const { notifications } = get();
    if (typeof newNotificationsData === "object") {
      set({
        newNotificationsData: [
          ...notifications,
          newNotificationsData as notification,
        ],
      });
    } else {
      set({
        newNotificationsData: [
          ...notifications,
          ...(newNotificationsData as notification[]),
        ],
      });
    }
  },
  setNotifications: () => {
    const { newNotificationsData } = get();
    return set({ notifications: newNotificationsData });
  },
}));
