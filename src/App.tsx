import React, { useEffect } from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Provider } from "react-redux";
import Store from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./routes/app.routes";
import { notifications } from "./services/notifications";

const App: React.FC = () => {
  useEffect(() => {
    const removeSubscription = notifications.subscribeToPushNotifications();

    return () => {
      removeSubscription();
    };
  }, []);

  return (
    <Provider store={Store}>
      <StatusBar translucent barStyle="default" />
      <NativeBaseProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
