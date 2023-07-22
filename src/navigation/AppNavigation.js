import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "../screens/MainScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { PostScreen } from "../screens/PostScreen";
import { BookedScreen } from "../screens/BookedScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { Platform } from "react-native";
import { THEME } from "../theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

export const AppNavigation = ({ onLayoutRootView }) => {
  const Stack = createNativeStackNavigator();
  const Tab =
    Platform.OS === "ios"
      ? createBottomTabNavigator()
      : createMaterialBottomTabNavigator();

  const screenOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === "ios" ? "white" : THEME.MAIN_COLOR,
    },
    headerTintColor: Platform.OS === "ios" ? THEME.MAIN_COLOR : "#fff",
  };

  const TabNavigator = ({ navigation }) => {
    useEffect(
      () =>
        navigation.setOptions({
          title: "Мой блог",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={"Take photo"}
                iconName={"ios-camera"}
                onPress={() => console.log("Press photo")}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title={"Toggle Drawer"}
                iconName={"ios-menu"}
                onPress={() => console.log("Press photo")}
              />
            </HeaderButtons>
          ),
        }),
      [navigation]
    );

    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: THEME.MAIN_COLOR,
        }}
        activeColor="white"
        inactiveColor="gray"
        tabBarColor={'none'}
        barStyle={{ backgroundColor: THEME.MAIN_COLOR}}
        sceneAnimationType={'shifting'}
        shifting={true}
      >
        <Tab.Screen
          name={"all"}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-albums" size={25} color={color} />
            ),
            tabBarLabel: "Все",
          }}
          component={MainScreen}
        />
        <Tab.Screen
          name={"booked"}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-star" size={25} color={color} />
            ),
            tabBarLabel: "Избранные",
          }}
          component={BookedScreen}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="MainScreen" component={TabNavigator} />
        <Stack.Screen name="CreateScreen" component={CreateScreen} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="BookedScreen" component={BookedScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
