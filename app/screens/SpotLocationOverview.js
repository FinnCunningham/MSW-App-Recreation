import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../Context";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import mswData from '../data/MagicSeaweedAPIExample_BournemouthPier_13_10_2021.json'
import Carousel from "../components/Carousel";
import Colors from "../components/Colors";
import Forecast from "../components/Forecast";
import AngleArrow from "../components/AngleArrow";
import TideChart from "../components/TideChart";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import locationHelper from "../data/locationHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetMeasures, getMeasureType } from "../data/measurementType";
import GlobalStyle from "../components/GlobalStyle";
import Icon from "react-native-vector-icons/FontAwesome";

const circleSize = 100;
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const GlobalMeasurementTypes = GetMeasures();
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
    }catch{}
}
/**
 * Compass component of a main circle and two arrows. 
 * @param {angles} Swell and wind angles to set the angles of the two arrows. 
 * @returns Compass component that displays a circle with two arrows at certain angles.
 */
const Compass = (props) => {
    return(
        <View style={{
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize/2,
            borderWidth: 2,
            borderColor: "#000",
            backgroundColor: "transparent",
            alignSelf: 'center'
        }}>
            <AngleArrow circleSize={circleSize} angle={props.angles.swellAngle} color={Colors.swell}/>
            <AngleArrow circleSize={circleSize} angle={props.angles.windAngle} color={Colors.wind}/>
        </View>
    )
}
/**
 * Converts unix timestamp to a readable day and hours.
 * @param {timeStamp} String Unix timestamp.   
 * @returns {day, hours} String of day and hour in a readable format.  
 */
const timeStampToDate = (timeStamp) => {
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let day = days[date.getDay()];
    return [day, hours];
} 

/**
 * Component of the spot screen for the selected location (from context storage).
 * @returns {SpotLocationOverview} Main component of the current spot screen. 
 */
const SpotLocationOverview = () => {
    const [context, setContext] = useContext(Context);
    const isFocused = useIsFocused();
    const [dayIndex, setDayIndex] = useState(0);
    const navigation = useNavigation();
    const [measureType, setMeasureType] = useState("metric")

    let locationData = locationHelper()[context.location];
    if(locationData == undefined){
        locationData = mswData;
    }
    const firstDay = timeStampToDate(locationData[0]["timestamp"]);
    const [day, setDay] = useState(firstDay[0]);
    //0 midnight 4 midday 8 next day midnight
    let dayData = {
        swellAngle: locationData[dayIndex]["swell"]["components"]["primary"]["direction"],
        windAngle:  locationData[dayIndex]["wind"]["direction"],
        duration: locationData[dayIndex]["swell"]["components"]["primary"]["period"] + "s",
        height: locationData[dayIndex]["swell"]["components"]["primary"]["height"],
        speed: locationData[dayIndex]["wind"]["speed"]
    }

    useEffect(() => {
        getMeasureType(getData, measureType, setMeasureType)
        
    }, [isFocused])

    /**
     * Changes the day states when the carousel ScrollView changes day selected. 
     * @param {currentIndex} Number index of the first day to be shown  
     * @param {days} Array[String] of every day of the week.
     */
    const changeDay = (currentIndex, days) => {
        setDay(days[currentIndex]);
        if(currentIndex > 4){
            //not enough data inside the json
            currentIndex = 4;
        }
        setDayIndex(currentIndex * 8)
    }

    /**
     * Converts measurments based on global measurement type.
     * @param {data} Number of measurement data.
     * @param {type} String of type of measurment.  
     * @returns {data} Number new measurment data based on conversion.
     */
    const setMeasure = (data, type) => {
        if(measureType == "metric"){
            if(type == "small"){

            }else if(type == "speed"){
                data = (data / 1.609).toFixed(0)
            }else{
                data = (data * 12).toFixed(1)
            }
            
        }
        return data;
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.topInfoContainer }>
                <View style={{flex: 1, alignSelf: "center", left: 10, flexDirection: "column"}}>
                    <View style={[styles.windSwellContainer, {backgroundColor: Colors.swell}]}>
                        <Text style={GlobalStyle.smallText}>Swell</Text>
                        <Text style={GlobalStyle.smallText}>{dayData.swellAngle}°</Text>
                        <Text style={GlobalStyle.smallText}>{setMeasure(dayData.height, "small")}{GlobalMeasurementTypes[measureType].smallLength} @ {dayData.duration}</Text>
                    </View> 
                </View>
                <Compass angles={{swellAngle: dayData.swellAngle, windAngle: dayData.windAngle}}/>
                <View style={{flex: 1, alignSelf: "center", left: 40}}>
                    <View style={[styles.windSwellContainer, {backgroundColor: Colors.wind}]}>
                        <Text style={GlobalStyle.smallText}>Wind</Text>
                        <Text style={GlobalStyle.smallText}>{dayData.windAngle}°</Text>
                        <Text style={GlobalStyle.smallText}>{setMeasure(dayData.speed, "speed")}{GlobalMeasurementTypes[measureType].speed}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.forecastContainer}>
                <Carousel day={firstDay[0]} changeDay={changeDay} days={days}/>
                <ScrollView horizontal={false} style={{}}>
                    <TouchableOpacity onPress={()=> {
                        setContext({location: context.location, day: firstDay[0],
                             locationData: locationData, measureType: measureType,
                            GlobalMeasurementTypes: GlobalMeasurementTypes})
                        navigation.navigate("SpotForecast");
                    }} activeOpacity={0.7} style={{flex: 1, height: "100%"}}>
                        <Forecast dayIndex={dayIndex} locationData={locationData}
                         measureType={measureType} GlobalMeasurementTypes={GlobalMeasurementTypes}/>
                        <View style={{flexDirection: "row"}}>
                            <Text style={[{alignSelf: "flex-start", flex: 1}, GlobalStyle.smallText]}>Click here to view full forecast</Text>
                            <View style={{backgroundColor: "lightblue", width: 35, height: 35, alignSelf: "flex-end", borderRadius: 45}}>
                            <Icon name='chevron-right' size={20} color='#000' style={{alignSelf: "center", top: "20%"}}/>
                            </View>
                        </View>
                        
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={{flex: 1, backgroundColor: Colors.surface, borderRadius: 10, padding: 1}}>
                <TideChart/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      flex: 1,
      padding: 4
    },
    topInfoContainer:{
        backgroundColor: Colors.surface,
        flex: 1,
        flexDirection: "row",
        borderRadius: 10,
        marginBottom: 4
    },
    text:{
        fontSize: 25,
        marginEnd: 20,
        backgroundColor: "#fff",
    },
    windSwellContainer: {
        height: "90%",
        width: "70%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    forecastContainer: {
        flex: 2,
        backgroundColor: Colors.surface,
        borderRadius: 10,
        marginBottom: 4
    }
})

export default SpotLocationOverview;