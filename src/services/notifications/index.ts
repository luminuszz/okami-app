import * as ExpoNotifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export class Notifications {
  private _token: string;

  private hasPermissions: boolean = false;
  private readonly project_id = "f239cd3d-8bd7-4a02-972a-17cb0bfb7425";

  public async checkPermissions(): Promise<void> {
    const response = await ExpoNotifications.getPermissionsAsync();

    let permissions: ExpoNotifications.PermissionStatus = response.status;

    if (permissions !== "granted") {
      const { status } = await ExpoNotifications.requestPermissionsAsync();

      permissions = status;
    }

    this.hasPermissions = permissions === "granted";
  }

  public async generateUniqueToken(): Promise<void> {
    const { data } = await ExpoNotifications.getExpoPushTokenAsync({
      projectId: this.project_id,
    });

    this._token = data;
  }

  public async hande(): Promise<void> {
    if (Device.isDevice && this.hasPermissions) {
      ExpoNotifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    }

    if (Platform.OS === "android") {
      await ExpoNotifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: ExpoNotifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    await this.generateUniqueToken();
  }

  public subscribeToPushNotifications(): () => void {
    const listener = ExpoNotifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response.notification);
      }
    );

    return () => {
      listener.remove();
    };
  }

  get token(): string {
    return this._token;
  }
}

export const notifications = new Notifications();
