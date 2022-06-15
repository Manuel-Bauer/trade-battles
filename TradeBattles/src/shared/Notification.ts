import PushNotificationIOS from '@react-native-community/push-notification-ios';

const showNotification = (title: string, message: string) => {
  PushNotificationIOS.presentLocalNotification({
    alertTitle: title,
    alertBody: message,
  });
};

const handleScheduleNotification = (
  title: string,
  message: string,
  timestamp: number,
) => {
  const date = new Date(timestamp);
  PushNotificationIOS.scheduleLocalNotification({
    alertTitle: title,
    alertBody: message,
    fireDate: date.toISOString(),
  });
};

const handleCancel = () => {
  PushNotificationIOS.removeAllDeliveredNotifications();
};

export {showNotification, handleScheduleNotification, handleCancel};
