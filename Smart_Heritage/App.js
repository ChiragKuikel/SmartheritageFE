import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "./Pages/home";
import ExploreScreen from "./Pages/explore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AboutPage from "./aboutus";
import DownloadData from "./Pages/apifetch";
import BuildingInfo from "./Pages/Viewinfo";
import LearnToUse from "./Pages/learntouse";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import HomeScreen from "./Pages/HomeScreen";
import DownloadScreen from "./Pages/DownloadScreen";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const homeName = "Home";
const Download = "Download";
const settingsName = "Settings";
const aboutName = "Aboutus";
//const homeScren="HomeScreen";
import MyProvider from "./Provider";
import assets from "./assets/assets";

function Maintab({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="homeName"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#1a434e", // ✅ Header background color (your requested hex color)
        },
        headerTintColor: "#1a434e", // ✅ Header text color
        headerTitleStyle: {
          fontSize: 20, // ✅ Header font size
          fontWeight: "bold", // ✅ Make text bold
        },
        headerLeft: () => (
          <Image
            style={{
              width: 100,
              height: 80,
              marginBottom: 1,
            }}
            source={assets.Mainlogo}
          ></Image>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row", marginRight: 20 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        ),
        tabBarStyle: {
          backgroundColor: "black", // Tab bar background color set to black
        },
        tabBarLabelStyle: {
          fontWeight: "bold", // Make the tab bar text bold
          color: "white", // Tab bar text color
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === Download) {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === aboutName) {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={homeName}
        component={HomePage}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name={aboutName}
        component={AboutPage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <MyProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={false}
      />
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
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={Signup}
            options={{ headerShown: false }}
          />
          {/* ✅ Add HomeScreen Here */}
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="DownloadData" component={DownloadData} />
          <Stack.Screen
            name="DownloadScreen"
            component={DownloadScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
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

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: "#52796f",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#005",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginHorizontal: 5,
    left: 18,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    top: 1,
  },
});
