import React, {useState} from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SpotsScreen from './app/screens/SpotsHome';
import { NavigationContainer } from '@react-navigation/native';
import { Context } from "./Context"
import ChartsScreen from './app/screens/ChartsScreen';
import MediaScreen from './app/screens/MediaScreen';
import LiveScreen from './app/screens/LiveScreen';
import LiveLocationScreen from './app/screens/LiveLocationScreen';
import SpotLocationOverview from './app/screens/SpotLocationOverview'
import ChartLocationScreen from './app/screens/ChartLocationScreen';
import Header from './app/components/Header';
import Icon from "react-native-vector-icons/FontAwesome";
import ForecastScreen from './app/screens/ForecastScreen';
import SettingsScreen from './app/screens/SettingsScreen';

const Tab = createMaterialTopTabNavigator();
const MainNavStack = createStackNavigator();
const SpotNavStack = createStackNavigator();
/**
 * Creates a component for the bottom navigation.
 * @param {setCurrentPage} state which changes title in the header.
 * @returns {Tab.Navigator} The bottom navigation.
 */
const HomeTabs = (props) => {
  return(
    <Tab.Navigator initialRouteName={SpotsScreen} screenOptions={{headerShown: false}} tabBarPosition={"bottom"}>
      <Tab.Screen name="Spots" children={() => <SpotsScreen setCurrentPage={props.setCurrentPage}/>} options={{}} listeners={{
        tabPress: () => {
          props.setCurrentPage("Spots");
        }
      }}
      options={{tabBarIcon: () => (
        <Icon name="location-arrow" size={20} color={"#000"}/>)}}/>
      <Tab.Screen name="Charts" children={() => <ChartsScreen setCurrentPage={props.setCurrentPage}/>} listeners={{
        tabPress: () => {
          props.setCurrentPage("Charts");
        }
      }}
      options={{tabBarIcon: () => (
        <Icon name="map" size={20} color={"#000"}/>)}}/>
      <Tab.Screen name="Media" component={MediaScreen} listeners={{
        tabPress: () => {
          props.setCurrentPage("Media");
        }
      }}
      options={{tabBarIcon: () => (
        <Icon name="image" size={20} color={"#000"}/>)}}/>
      <Tab.Screen name="Live" children={() => <LiveScreen setCurrentPage={props.setCurrentPage}/>} listeners={{
        tabPress: () => {
          props.setCurrentPage("Live");
        }
      }}
    options={{tabBarIcon: () => (
      <Icon name="calendar" size={20} color={"#000"}/>)}}/>
    </Tab.Navigator>
  );
} 

/**
 * Creates a stack navigator component.
 * @param {setCurrentPage} state which changes title in the header.
 * @returns {SpotNavStack.Navigator} The stack navigator to access other screens.
 */
const SpotStack = (props) => {
  return(
    <SpotNavStack.Navigator screenOptions={{headerShown: false}}>
      <SpotNavStack.Screen name="SpotLocationOverview" children={() => <SpotLocationOverview setCurrentPage={props.setCurrentPage}/>}/>
      <SpotNavStack.Screen name="SpotForecast" children={() => <ForecastScreen setCurrentPage={props.setCurrentPage}/>}/>
    </SpotNavStack.Navigator>
  )
}

/**
 * Main function that contains the app.
 * @returns Whole application to render.
 */

export default function App() {
  const [context, setContext] = useState("Default value");
  const [currentPage, setCurrentPage] = useState("Spots");
   
  return (
    <Context.Provider value={[context, setContext]}>
      <NavigationContainer >
      
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        <MainNavStack.Navigator initialRouteName={{HomeTabs}} screenOptions={{headerShown: false}}>
          <MainNavStack.Screen name="HomeTabs" children={() => <HomeTabs setCurrentPage={setCurrentPage}/>} />
          <MainNavStack.Screen name="SpotStack" children={() => <SpotStack setCurrentPage={setCurrentPage}/>}/>
          <MainNavStack.Screen name="ChartLocation" children={() => <ChartLocationScreen setCurrentPage={setCurrentPage}/>}/>
          <MainNavStack.Screen name="LiveLocation" children={() => <LiveLocationScreen setCurrentPage={setCurrentPage}/>}/>
          <MainNavStack.Screen name="Settings" children={() => <SettingsScreen setCurrentPage={setCurrentPage}/>}/>
        </MainNavStack.Navigator>
      </NavigationContainer>
      
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
