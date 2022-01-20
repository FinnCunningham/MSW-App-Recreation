import React, { useContext } from "react";
import { View } from "react-native";
import LocationList from "../components/LocationList";
import { Context } from "../../Context";
import LocationTop from "../components/LocationTop";
import Colors from "../components/Colors";
/**
 * Component of the first chart screen displayed within tab navigation. 
 * @param {setCurrentPage} state which changes title in the header. 
 * @returns {ChartsScreen} Location list for the charts.
 */
const ChartsScreen = (props) => {
  const [context, setContext] = useContext(Context);
  /**
   * Changes context data and setPage state before changing the current page to chart location screen.
   * @param {item} Object data from the item component that was pressed. 
   * @param {setPage} State changes the current title at the top of the screen.  
   * @param {navigation} Navigation function to change the current screen being displayed.
   */
  const locationOnPress = (item, setPage, navigation) => {
      setContext({location: item.location});
      setPage(`Charts: ${item.location}`)
      navigation.navigate("ChartLocation");
  }
    return (
      <View style={{flex: 1, backgroundColor: Colors.background}}>
        <LocationTop mainColor={"#1da888"} icon="map" title="View Charts by location"/>
        <LocationList setCurrentPage={props.setCurrentPage}
         locationOnPress={locationOnPress}/>
      </View>
    );
}
  
export default ChartsScreen;