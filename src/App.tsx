import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Provider } from "react-redux";
import Store from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes/app.routes";

const App: React.FC = () => {
  return (
    <Provider store={Store}>
      <StatusBar translucent barStyle="default" />
      <NavigationContainer>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
