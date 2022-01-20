import React, { useContext, useEffect, useState } from "react" 
import { useIsFocused } from "@react-navigation/core";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Context } from "../../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetMeasures } from "../data/measurementType";
import GlobalStyle from "../components/GlobalStyle";

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
    }catch{

    }
}
/**
 * individual weather data item component. 
 * @param {time} Number unix timestamp
 * @param {temp} Number temperature data.
 * @param {windSpeed} Number Wind speed data.
 * @param {humid} Number humidity data.
 * @param {windDeg} Number wind direction in degrees.
 * @param {weather} Number weather in text.
 * @returns LiveIcon componenet.
 */
const LiveIcon = (props) => {
    return(
        <View style={{height: 55}}>
            <Text style={{top: "50%", left: 2}}>{props.time}</Text>
            <View style={{flexDirection: "row", backgroundColor: "lightblue", width: "90%", height: 50, marginBottom: 1, alignItems: "center", justifyContent: "space-evenly", alignSelf: "flex-end"}}>
                <Text style={styles.dataText}>{props.temp}</Text>
                <View style={{flex: 2, flexDirection: "row"}}>
                    <Text style={styles.dataText}>{props.windSpeed}</Text>
                </View>
                <Text style={styles.dataText}>{props.humid}</Text>
                <Text style={styles.dataText}>{props.windDeg}°</Text>
                <View style={{flex: 2, flexDirection: "row"}}>
                    <Text style={styles.dataText}>{props.weather}</Text>
                </View>
            </View>
        </View>
    )
}

/**
 * Component of the live weather data screen.
 * @returns LiveLocationScreen component.
 */
const LiveLocationScreen = () => {
    const [context, setContext] = useContext(Context);
    const [dataList, setDatalist] = useState([])
    const isFocused = useIsFocused();
    const apiKey = "9ab524bd7b3f28e8e95b972ae6a7f7ac";
    /**
     * Converts unix timestamp to readable hour and minute.
     * @param {unix} Number unix timestamp.  
     * @returns String of readable hour and minute.
     */
    const unixToTime = (unix) => {
        let dateTime = new Date(unix * 1000)
        let hours = dateTime.getHours();
        var mins = "0" + dateTime.getMinutes();
        return hours + ":" + mins;
    }

    /**
     * Creates an array of weather data item.
     * @param {data} Object returned from API. 
     * @param {unitType} String measurement type "metric" or "imperial". 
     * @returns Array[<LiveIcon />]
     */
    const createList = (data, unitType) => {
        let itemList = [];
        for(let i=0;i<data.length;i++){
            itemList.push(<LiveIcon time={`${unixToTime(data[i]["dt"])}`} 
            temp={`${data[i]["temp"].toFixed(0)}°${GlobalMeasurementTypes[unitType].temp}`}
            windSpeed={`${data[i]["wind_speed"]}${GlobalMeasurementTypes[unitType].speed}`} 
            humid={`${data[i]["humidity"]}°${GlobalMeasurementTypes[unitType].temp}`} windDeg={data[i]["wind_deg"]} 
            weather={data[i]["weather"][0].main} key={i}/>) 
        }
        return itemList;
    }
    useEffect(() => {
        let unitType = "metric";
        getData("measurementType").then((data)=>{
            if(data.length > 0){
                data = data.substring(1, data.length-1);
                if(data == "imperial"){
                    unitType = "imperial"
                }
            }
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${context.lat}&lon=${context.long}&appid=${apiKey}&units=${unitType}`)
            .then((response) => {return response.json()})
            .then((data) =>{
                setDatalist(createList(data["hourly"], unitType));
            })
        })
        
      }, [isFocused]);
    return(
        <View style={{ flex: 1}}>
            <View style={{flexDirection: "row", justifyContent: "space-evenly", width: "90%", alignSelf: "flex-end", padding: 12}}>
                <Text style={[{transform: [{ rotate: '320deg'}]}, GlobalStyle.headerText, styles.headerText]}>temp</Text>
                <View style={{flex: 2, flexDirection: "row"}}>
                    <Text style={[{transform: [{ rotate: '320deg'}]}, GlobalStyle.headerText, styles.headerText]}>wind spd</Text>
                </View>
                <Text style={[{transform: [{ rotate: '320deg'}]}, GlobalStyle.headerText, styles.headerText]}>humidity</Text>
                <Text style={[{transform: [{ rotate: '320deg'}]}, GlobalStyle.headerText, styles.headerText]}>wind deg</Text>
                <View style={{flex: 2, flexDirection: "row", left: 5}}>
                    <Text style={[{transform: [{ rotate: '320deg'}]},  GlobalStyle.headerText, styles.headerText]}>weather</Text>
                </View>
            </View>
            <ScrollView>
                {dataList}   
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    dataText:{
        fontSize: 20,
        flex: 1,
        textAlign: "center"
    },
    headerText:{
        fontSize: 15,
        flex: 1
    }
})

export default LiveLocationScreen;