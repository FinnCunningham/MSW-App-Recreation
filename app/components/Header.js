import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

/**
 * Creates a custom header for the top of the screen. 
 * @param {setCurrentPage} Function State changes the current page string.
 * @param {currentPage} String State title of the current page.
 * @returns {Header} Component.
 */
const Header = (props) => {
    const navigation = useNavigation();
    return(
        <View style={{flexDirection: "row", backgroundColor: "#fff"}}>
            <TouchableOpacity style={{ minWidth: 100, minHeight: 90}} onPress={()=>{
                props.setCurrentPage("Spots");
                navigation.navigate("HomeTabs");
            }}>
                <Image source={require('../../assets/mswLogo2.png')} width={200} resizeMode={"center"} style={[styles.image, {backgroundColor: "transparent", top: 10}]}/>
            </TouchableOpacity>
            <Text style={styles.pageText}>{props.currentPage}</Text>
            <TouchableOpacity style={styles.settings}
            onPress={()=>{
                navigation.navigate("Settings");
            }}
            >
                <Icon name='cog' size={30} color='#000'/> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 90,
        flex: 1
    },
    pageText:{
        flex: 2,
        alignSelf: "center", 
        fontSize: 23,
        textAlign: "center"
    },
    settings: {
        flex: 1,
        alignSelf: "center",
        alignItems: "flex-end",
        right: 20
    }
})

export default Header;