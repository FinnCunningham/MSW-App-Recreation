import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GlobalStyle from "./GlobalStyle";

/**
 * Component of the top of screens with location list 
 *  to show the difference between the screens.
 * @param {icon} String name of the icon to be shown.
 * @param {mainColor} String color of the background.
 * @param {title} String title of this component being shown.
 * @returns Component of the top of screen. 
 */
const LocationTop = (props) => {
    return(
        <View style={{backgroundColor: "transparent", height: 200, alignItems: "center"}}>
          <View style={{height: 200, width: "100%", backgroundColor: props.mainColor, borderBottomEndRadius: 70, borderBottomStartRadius: 70, flexDirection: "column"}}>
            <Text style={[{ fontSize: 20, textAlign: "center", padding: 15, color: "#fff", flex: 1}, GlobalStyle.smallText]}>{props.title}</Text>
            <Icon name={props.icon} size={50} color='#fff' key={1} style={{alignSelf: "center", flex: 1}}/>
          </View>
        </View>
    )
}

export default LocationTop;