import React, { useContext } from "react";
import { View, Text } from "react-native";
import LocationList from "../components/LocationList";
import { Context } from "../../Context";
import Colors from "../components/Colors";
import LocationTop from "../components/LocationTop";

/**
 * 
 * @param {setCurrentPage} state which changes title in the header. 
 * @returns {LiveScreen} Location list for live weather data.
 */
const LiveScreen = (props) => {
  const [context, setContext] = useContext(Context);
  /**
   * Changes context data and setPage state before changing the current page to live weather location screen.
   * @param {item} Object data from the item component that was pressed. 
   * @param {setPage} State changes the current title at the top of the screen.  
   * @param {navigation} Navigation function to change the current screen being displayed.
   */
  const locationOnPress = (item, setPage, navigation) => {
      setContext({location: item.location, lat: item.lat, long: item.long});
      setPage(`Live: ${item.location}`)
      navigation.navigate("LiveLocation");
  }
    return (
      <View style={{flex: 1, backgroundColor: Colors.background}}>
        <LocationTop mainColor={"#e82e91"} icon="cloud" title="View Live data by location"/>
        <LocationList setCurrentPage={props.setCurrentPage}
         locationOnPress={locationOnPress}/>
      </View>
    );
}

export default LiveScreen;