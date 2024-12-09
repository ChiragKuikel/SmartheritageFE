import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Pages/home';
import ExploreScreen from './Pages/explore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutPage from './aboutus';
import downloadData from './Pages/apifetch';
import DownloadData from './Pages/apifetch';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const homeName = 'Home';
const exploreName = 'Explore';
const settingsName ='Settings';
const aboutName = 'Aboutus'
function Maintab(){
  return(
    <Tab.Navigator initialRouteName='homeName'
      screenOptions={({route})=>({
        tabBarIcon:({focused,color,size})=>{
          let iconName;
          let rn = route.name;
          if(rn=== homeName){
            iconName = focused?'home':'home-outline';
          }
          else if(rn === exploreName){
            iconName = focused?'list':'list-outline';
          }
          else if(rn === settingsName){
            iconName = focused?'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
      >
      <Tab.Screen name={homeName} component={HomePage} />
      <Tab.Screen name={exploreName} component={DownloadData} />
      <Tab.Screen name={settingsName} component={ExploreScreen} />
      <Tab.Screen name={aboutName} component={AboutPage} />
      </Tab.Navigator>
  )
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
        <Stack.Screen name="About Us" component ={AboutPage} />
        <Stack.Screen name="bluetooth" component ={ExploreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

