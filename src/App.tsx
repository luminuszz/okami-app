import React from "react";
import { NativeBaseProvider } from "native-base";
import HomePage from "./features/home/home.page";
import { Provider } from "react-redux";
import Store from "./store/store";
import UpdateChapterPage from "./features/home/updateChapter.page";

const App: React.FC = () => (
  <Provider store={Store}>
    <NativeBaseProvider>
      <UpdateChapterPage />
    </NativeBaseProvider>
  </Provider>
);

export default App;
