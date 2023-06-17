import React from "react";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import Store from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import AppRoutes from "./routes/app.routes";

const App: React.FC = () => (
  <Provider store={Store}>
    <NativeBaseProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </NativeBaseProvider>
  </Provider>
);

export default App;
