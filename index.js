import { registerRootComponent } from "expo";

import App from "./src/App";
import { notificationService } from "./src/services/notifications";

notificationService()
  .then(() => console.log("Notification service started"))
  .catch((err) => console.log(err));

registerRootComponent(App);
