import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "../screens/MainScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { PostScreen } from "../screens/PostScreen";
import { BookedScreen } from "../screens/BookedScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { Platform, View } from "react-native";
import { THEME } from "../theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

export const AppNavigation = ({ onLayoutRootView }) => {
  const Stack = createNativeStackNavigator();
  const Tab =
    Platform.OS === "ios"
      ? createBottomTabNavigator()
      // : createBottomTabNavigator();
  : createMaterialBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const TabNavigator = ({ navigation }) => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor:
            Platform.OS === "ios" ? THEME.MAIN_COLOR : "white",
          tabBarBackground: () => (
            <View
              style={{
                backgroundColor:
                  Platform.OS === "ios" ? "white" : THEME.MAIN_COLOR,
                height: "100%",
              }}
            />
          ),
          tabBarLabelStyle: { paddingBottom: 3 },
        }}
        tabBarShowLabel
        activeColor="white"
        inactiveColor="gray"
        tabBarColor={"none"}
        barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
        sceneAnimationType={"shifting"}
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

  const DrawerNavigator = () => {
    const screenOptions = {
      headerStyle: {
        backgroundColor: Platform.OS === "ios" ? "white" : THEME.MAIN_COLOR,
      },
      headerTintColor: Platform.OS === "ios" ? THEME.MAIN_COLOR : "#fff",
      drawerActiveTintColor: THEME.MAIN_COLOR,
      drawerLabelStyle: {
        fontFamily: 'OpenBold'
      }
    };

    return (
      <Drawer.Navigator screenOptions={screenOptions}>
        <Drawer.Screen
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          name="Create"
          component={CreateScreen}
          options={{ title: "Создать" }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{ title: "О приложении" }}
        />
      </Drawer.Navigator>
    );
  };

  const Home = ({ navigation, route }) => {
    useEffect(() => {
      // console.log(route)
      navigation.setOptions({
        title: "Мой блог",
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title={"Take photo"}
              iconName={"ios-camera"}
              onPress={() => navigation.jumpTo('Create')}
            />
          </HeaderButtons>
        ),
      });
    });

    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainScreen" component={TabNavigator} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="CreateScreen" component={CreateScreen} />
        <Stack.Screen name="BookedScreen" component={BookedScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
