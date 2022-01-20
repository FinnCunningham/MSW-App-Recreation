/**
 * Spots screen from tab navigation
 */
import React, { useContext } from "react";
import { View, Text } from "react-native";
import LocationList from "../components/LocationList";
import { Context } from "../../Context";
import LocationTop from "../components/LocationTop";
import Colors from "../components/Colors";
/**
 * 
 * @param {setCurrentPage}  state which changes title in the header.
 * @returns {SpotsScreen} Location list for the spots information.
 */
const SpotsScreen = (props) => {
    const [context, setContext] = useContext(Context);
    const locationOnPress = (item, setPage, navigation) => {
        setContext({location: item.location});
        setPage(`Spot ${item.location}`)
        navigation.navigate("SpotStack");
    }

    return (
        <View style={{flex: 1, backgroundColor: Colors.background}}>
            <LocationTop mainColor={"#1da842"} icon="location-arrow" title="View spot information by location"/>
            <LocationList setCurrentPage={props.setCurrentPage}
                locationOnPress={locationOnPress}/>
        </View>
        
    );
}

export default SpotsScreen;