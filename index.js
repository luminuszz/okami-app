import { registerRootComponent } from "expo";

import App from "./src/App";
import { notifications } from "./src/services/notifications";

notifications
  .hande()
  .then(() => console.log("Ok"))
  .catch((e) => console.log(e));

registerRootComponent(App);
