import { useNavigation, useIsFocused } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { View, Text, FlatList, CheckBox, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../components/Colors";
import getLocations from "../data/locations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GetMeasures, getMeasureType} from "../data/measurementType";
import GlobalStyle from "./GlobalStyle";

const GlobalMeasurementTypes = GetMeasures();
/**
 * Stores string value in Async Storage based on the value and key given.
 * @param {value} String to be set inside Async Storage. 
 * @param {key} String of the key of the Async Storage wanted.
 */
const storeData = async (value, key) => {  
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}
/**
 * Returns string from Async Storage based on key given.
 * @param {key} String key to access the certain storage.  
 * @returns {data} String storage from the async storage. 
 */
const getData = async(key) => {
    try{
        const data = await AsyncStorage.getItem(key)
        if(data !== null){
            return data
        }else{
            return [];
        }
    }catch{

    }
}

const currentLocation = [50.743269324923, -1.8969966552680007];
/**
 * Calculates the distance between two location points. 
 * @param {lat1} String first lat coordinate. 
 * @param {lon1} String first long coordinate.
 * @param {lat2} String second lat coordinate.
 * @param {lon2} String second long coordinate. 
 * @returns {distance} Number distance between the two coordinate.
 */
const getDistance = (lat1, lon1, lat2, lon2) => {
    let R = 6371; // km
    let dLat = toRad(lat2-lat1);
    let dLon = toRad(lon2-lon1);
    let lat1New = toRad(lat1);
    let lat2New = toRad(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1New) * Math.cos(lat2New); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let distance = R * c;
    return distance;
}
/**
 * Helper function for the calculations.
 * @param {value} Number to be calculated with.  
 * @returns {Number} new value.  
 */
const toRad = (value) => {
    return value * Math.PI / 180;
}

/**
 * Creates each item inside location flat list.
 * @param {item} Object item containing location data.
 * @param {onPress} Function of what happens when the item is pressed. 
 * @param {backgroundColor} String of color for the background.
 * @param {textColor} String of the color for the text.
 * @param {setFavArray} State Function sets fav array.
 * @param {favArray} Satte Array[String] contains fav array.
 * @param {favColor} String contains what color to show if it is favorited.
 * @param {measureType} String global measurment to be used.
 * @returns Component of location item. 
 */
const Item = ({ item, onPress, backgroundColor, textColor, setFavArray, favArray, favColor, measureType }) => {
    let distance = getDistance(currentLocation[0], currentLocation[1], item.lat, item.long).toFixed(1);
    let symbol = GlobalMeasurementTypes[measureType].longLength;
    if(measureType == "imperial"){
        distance = (distance / 1.609).toFixed(1);
    }
    return(
    
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor, {elevation: 1}]}>
        <Text style={[styles.title, textColor, GlobalStyle.headerText]}>{item.location}</Text>
        <Text style={GlobalStyle.smallText}>{distance}{symbol}</Text>
        <TouchableOpacity style={{position:"absolute", right: 50, top: "50%"}} onPress={()=>{
            if(!favArray.includes(item.location)){
                getData("favArray").then((data)=>{
                    if(data == '"[]"'){
                        let stringArray = "";
                        stringArray += `${item.location}`
                        storeData(stringArray, "favArray");
                        setFavArray([stringArray])  
                    }else{
                        data = data.substring(1, data.length -1)
                        let stringArray = data += `,${item.location}`;
                        storeData(stringArray, "favArray")
                        setFavArray(stringArray.split(","))   
                    }
                });
            }else{
                const index = favArray.indexOf(item.location)
                let newArray = favArray;
                newArray.splice(index, 1)
                let stringArray = newArray.join();
                storeData(stringArray, "favArray");
                setFavArray(newArray);
            }      
        }}>
            <Icon name='heart' size={25} color={favColor} />
        </TouchableOpacity>
        <Icon name='chevron-right' size={25} color='#4a4a4a' key={1} style={[{position: "absolute", right: 10, top: "50%"}]}/>
    </TouchableOpacity>
    )}

/**
 * Makes the app wait until the time given.
 * @param {timeout} Number (ms) for time waiting.  
 * @returns setTimeOut Function
 */
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

/**
 * Creates List of locations to display to the user.
 * @param {locationOnPress} Function of onPress of each item in the flat list.
 * @param {setCurrentPage} State Function to change the page title.
 * @returns Location List Component.
 */
const LocationList = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [favArray, setFavArray] = useState([]);
    const [showFav, setShowFav] = useState(false);
    const [measureType, setMeasureType] = useState("metric")
    const isFocused = useIsFocused();
    useEffect(() => {
        getData("favArray").then((data)=>{
            let dataResponse;
            if(data.length < 1){
                storeData("[]", "favArray")
                dataResponse = [];
            }else if(data.trim().split(",").length > 1){
                data = data.substring(1, data.length-1)
                dataResponse = data.split(",");
            }else{
                //length == 1
                dataResponse = [data]
            }
            setFavArray(dataResponse)
        })
    }, [])

    useEffect(() => {
        getMeasureType(getData, measureType, setMeasureType)
    }, [isFocused])

    const navigation = useNavigation();
    /**
     * @param {item} Object data for the item being rendered. 
     * @returns render of flatlist item.
     */
    const renderItem = ({ item }) => {
        let favColor = ""
        if(favArray.includes(item.location)){
            favColor = "pink";
        }else{
            favColor = "lightgray"
        }
        
        return (
            <View>
                <Item
                item={item}
                onPress={
                    () => props.locationOnPress(item, props.setCurrentPage, navigation)}
                setFavArray={setFavArray}
                favArray={favArray}
                favColor={favColor}
                measureType={measureType}
                />
            </View>
        );
    };

    /**
     * onRefresh event function. 
     */
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    });
    let locationData = getLocations();
    let tempArray = [];
    if(showFav){
        favArray.forEach(favLocation => {
            if(locationData.filter(e => e.location == favLocation).length > 0){
                let index = locationData.map(function(x) {return x.location; }).indexOf(favLocation)
                tempArray.push(locationData[index])  
            }
        });
        locationData = tempArray;
    }    
    return (
        <View style={styles.container}>
            <View>
                <CheckBox
                value={showFav}
                onValueChange={setShowFav}
                style={styles.checkboxContainer}
                />
                <Text style={{}}>Show only favorites</Text>
            </View>
            
            <FlatList
                style={{paddingTop: 5}}
                refreshControl={<RefreshControl
                    colors={["#9Bd35A", "#689F38"]}
                    refreshing={refreshing}
                    onRefresh={onRefresh} />}
                data={locationData.sort((a, b)=>{
                    return a.distance - b.distance; 
                })}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    item: {
      backgroundColor: Colors.surface,
      padding: 15,
      marginVertical: 2,
      marginHorizontal: 10,
      borderRadius: 10,
    },
    title: {
      fontSize: 22,
    },
    circleButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#ed5173',
        position: "absolute",
        bottom: 10,
        left: 10,
    },
    checkboxContainer:{
        flexDirection: "row",
    }
});

export default LocationList;