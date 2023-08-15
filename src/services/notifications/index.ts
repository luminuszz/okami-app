import OneSignal from "react-native-onesignal";

import { ONE_SIGNAL_APP_ID } from "@env";

export const notificationService = async (): Promise<void> => {
  OneSignal.setAppId(ONE_SIGNAL_APP_ID);

  OneSignal.promptForPushNotificationsWithUserResponse((response) => {
    console.log("Prompt response:", response);
  });

  OneSignal.setNotificationWillShowInForegroundHandler(
    (notificationReceivedEvent) => {
      console.log(
        "OneSignal: notification will show in foreground:",
        notificationReceivedEvent
      );
      const notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData;
      console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    }
  );

  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log("OneSignal: notification opened:", notification);
  });
};
