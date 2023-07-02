import React from "react";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import HomePage from "../features/home/home.page";
import UpdateChapterPage from "../features/home/updateChapter.page";
import UpdateWorkPage from "../features/work/updateWork.page";
import MarkWorkFinishedPage from "../features/work/markWorkFinished.page";

export type AppRoutesParams = {
  Home: undefined;
  UpdateChapter: {
    workId: string;
    chapter: number;
  };
  UpdateWorkPage: {
    workId: string;
  };
  MarkWorkFinishedPage: undefined;
};

export type AppRoute<Route extends keyof AppRoutesParams> =
  NativeStackScreenProps<AppRoutesParams, Route>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesParams>();

const AppRoutes: React.FC = () => (
  <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
    <Screen name="Home" component={HomePage} />
    <Screen name="UpdateChapter" component={UpdateChapterPage} />
    <Screen name="UpdateWorkPage" component={UpdateWorkPage} />
    <Screen name="MarkWorkFinishedPage" component={MarkWorkFinishedPage} />
  </Navigator>
);

export default AppRoutes;
