import { useNotificationStore } from "@/zustand/useNotificationStore";

export const useNotification = () => {
  const {
    newNotificationsData,
    notifications,
    setNewNotificationsData,
    setNotifications,
    clearsetNewNotificationsData,
  } = useNotificationStore();
  return {
    newNotificationsData,
    notifications,
    clearsetNewNotificationsData,
    setNewNotificationsData,
    setNotifications,
  };
};
