import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./Pages/home";
import ExploreScreen from "./Pages/explore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AboutPage from "./aboutus";
import downloadData from "./Pages/apifetch";
import DownloadData from "./Pages/apifetch";
import BuildingInfo from "./Pages/Viewinfo";
import LearnToUse from "./Pages/learntouse";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import HomeScreen from "./Pages/HomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const homeName = "Home";
const Download = "Download";
const settingsName = "Settings";
const aboutName = "Aboutus";
//const homeScren="HomeScreen";



function Maintab() {
  return (
    <Tab.Navigator
      initialRouteName="homeName"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === Download) {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomePage} />
      {/* <Tab.Screen name={Download} component={DownloadData} /> */}
      {/*<Tab.Screen name={settingsName} component={{}} /> Removing settings for now coz no functionality*/}
      <Tab.Screen name={aboutName} component={AboutPage} />
      
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={Maintab}
          options={{ headerShown: false }} // Hide the header for MainTabs screen
        />
        <Stack.Screen name="About Us" component={AboutPage} />
        <Stack.Screen name="bluetooth" component={ExploreScreen} />
        <Stack.Screen name="buildingInfoName" component={BuildingInfo} />
        <Stack.Screen name="learnToUse" component={LearnToUse} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={Signup} options={{headerShown:false}} />
        {/* ✅ Add HomeScreen Here */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name= "DownloadData" component={DownloadData}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import HomeScreen from "./Pages/HomeScreen"; // Import your HomeScreen

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <HomeScreen />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
