import React from "react";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import HomePage from "../features/home/home.page";
import UpdateChapterPage from "../features/home/updateChapter.page";

type AppRoutesParams = {
  Home: undefined;
  UpdateChapter: {
    workId: string;
    chapter: number;
  };
};

export type AppRoute<Route extends keyof AppRoutesParams> =
  NativeStackScreenProps<AppRoutesParams, Route>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesParams>();

const AppRoutes: React.FC = () => (
  <Navigator
    screenOptions={{ headerShown: false, contentStyle: { marginTop: 12 } }}
    initialRouteName="Home"
  >
    <Screen name="Home" component={HomePage} />
    <Screen name="UpdateChapter" component={UpdateChapterPage} />
  </Navigator>
);

export default AppRoutes;
