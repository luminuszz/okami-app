import React, { useEffect } from "react";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import HomePage from "../features/home/home.page";
import UpdateChapterPage from "../features/home/updateChapter.page";
import UpdateWorkPage from "../features/work/updateWork.page";
import MarkWorkFinishedPage from "../features/work/markWorkFinished.page";
import LoginPage from "../features/auth/login.page";
import { useAppDispatch, useAppSelector } from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout, setToken } from "../features/auth/auth.slice";

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

export type AuthRoutesParams = {
  LoginPage: undefined;
};

export type AuthRoute<Route extends keyof AuthRoutesParams> =
  NativeStackScreenProps<AuthRoutesParams, Route>;

export type AppRoute<Route extends keyof AppRoutesParams> =
  NativeStackScreenProps<AppRoutesParams, Route>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesParams>();

const AuthStackNavigation = createNativeStackNavigator<AuthRoutesParams>();

const screenOptions = { headerShown: false };

export const AppRoutes: React.FC = () => (
  <Navigator screenOptions={screenOptions} initialRouteName="Home">
    <Screen name="Home" component={HomePage} />
    <Screen name="UpdateChapter" component={UpdateChapterPage} />
    <Screen name="UpdateWorkPage" component={UpdateWorkPage} />
    <Screen name="MarkWorkFinishedPage" component={MarkWorkFinishedPage} />
  </Navigator>
);

export const AuthRoutes: React.FC = () => (
  <AuthStackNavigation.Navigator
    screenOptions={screenOptions}
    initialRouteName="LoginPage"
  >
    <AuthStackNavigation.Screen name="LoginPage" component={LoginPage} />
  </AuthStackNavigation.Navigator>
);

const Routes: React.FC = () => {
  console.log("Routes");

  const token = useAppSelector((state) => state.auth.token);

  const apDispatch = useAppDispatch();

  useEffect(() => {
    void AsyncStorage.getItem("@okami:token").then((token) => {
      console.log({ token });

      apDispatch(token ? setToken(token) : logout());
    });
  }, []);

  return token ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
