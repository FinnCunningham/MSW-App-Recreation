import React from "react";
import {View, Text, StyleSheet} from "react-native"
import Colors from "./Colors";
import GlobalStyle from "./GlobalStyle";
import AngleArrow from "./AngleArrow";
/**
 * Creates a item for each forecast hourly section.
 * @param {measureType} String type of measurement.
 * @param {dayData} Object data about the days forecast.
 * @param {GlobalMeasurementTypes} Object Global object for measurements.
 * @returns {DayItem} list item component.
 */
const DayItem = (props) => {
    const setMeasure = (data) => {
        if(props.measureType == "metric"){
            data = (data * 12).toFixed(1)
        }
        return data;
    }
    return(
        <View style={{flex:1, flexDirection: "row", paddingBottom: 1, margin: 2}}>
            <View style={styles.dayLeftContainer}>
                <Text style={[{fontSize: 14, color:"#fff"}, GlobalStyle.smallText]}>
                    {setMeasure(props.dayData.minHeight)} - {setMeasure(props.dayData.maxHeight)}
                    {props.GlobalMeasurementTypes[props.measureType].smallLength}</Text>
            </View>
            <View style={styles.dayCenterContainer}>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "space-evenly"}}>
                    <Text style={[styles.centerText, GlobalStyle.smallText]}>{setMeasure(props.dayData.height)}
                    {props.GlobalMeasurementTypes[props.measureType].smallLength}</Text>
                    <Text style={[styles.centerText, GlobalStyle.smallText]}>{props.dayData.duration}</Text>
                    <Text style={[styles.centerText, GlobalStyle.smallText]}>{setMeasure(props.dayData.speed)}
                    {props.GlobalMeasurementTypes[props.measureType].speed}</Text>
                </View>
            </View>
            <View style={styles.dayRightContainer}>
                <AngleArrow circleSize={40} angle={props.dayData.windAngle} color={Colors.wind}/>
                <Text style={[{fontSize: 15, color:"#fff", alignSelf: "center", bottom: 1, position: "absolute"}, GlobalStyle.smallText]}>{props.dayData.windDirection}</Text>
            </View>
        </View>
    )
}
/**
 * @param {locationData} Object data for the location selected.
 * @param {dayIndex} Number current day index.
 * @param {styling} Object extra styling. 
 * @param {measureType} String type of measurement.
 * @param {GlobalMeasurementTypes} Object Global object for measurements.
 * @returns {Forecast} Forecast Component.
 */
const Forecast = (props) => {
    let fullDayData = [];
    /**
     * @returns {tempData} array of certain dayData.
     */
    const getFullDayData = () => {
        let tempData = [];
        for(let i=0; i<4; i++){
            let dayData = {
                minHeight: props.locationData[props.dayIndex + i]["swell"]["absMinBreakingHeight"],
                maxHeight:  props.locationData[props.dayIndex + i]["swell"]["absMaxBreakingHeight"],
                duration: props.locationData[props.dayIndex + i]["swell"]["components"]["primary"]["period"] + "s",
                height: props.locationData[props.dayIndex + i]["swell"]["components"]["primary"]["height"],
                speed: props.locationData[props.dayIndex + i]["wind"]["speed"],
                swellAngle: props.locationData[props.dayIndex + i]["swell"]["components"]["primary"]["direction"],
                windAngle:  props.locationData[props.dayIndex + i]["wind"]["direction"],
                windDirection: props.locationData[props.dayIndex + i]["wind"]["compassDirection"],
            } 
            tempData.push(dayData)
        }
        return tempData;
    }
    fullDayData = getFullDayData();
    return(
        <View>
            <View style={{flexDirection: "row", alignContent: "center" , flex: 1}}>
                <View style={{flex: 1, alignItems: "center"}}>
                    <Text style={GlobalStyle.headerText}>Surf ht</Text>
                </View>
                <View style={{flex: 4,alignItems: "center"}}>
                    <Text style={GlobalStyle.headerText}>Primary Swell</Text>
                </View>
                <View style={{flex: 1, alignItems: "flex-start"}}>
                    <Text style={GlobalStyle.headerText}>Wind</Text>
                </View>
            </View>
            <View style={[{padding: 2, flex: 1, width: "100%"}, props.styling]}>
            <DayItem dayData={fullDayData[0]} measureType={props.measureType} 
            GlobalMeasurementTypes={props.GlobalMeasurementTypes}/>
            <DayItem dayData={fullDayData[1]} measureType={props.measureType} 
            GlobalMeasurementTypes={props.GlobalMeasurementTypes}/>
            <DayItem dayData={fullDayData[2]} measureType={props.measureType} 
            GlobalMeasurementTypes={props.GlobalMeasurementTypes}/>
            <DayItem dayData={fullDayData[3]} measureType={props.measureType} 
            GlobalMeasurementTypes={props.GlobalMeasurementTypes}/>
        </View>
        </View>
       
    )
}

const styles = StyleSheet.create({
    dayLeftContainer:{
        backgroundColor: Colors.surfaceSecondary,
        flex: 1,
        padding: 10
    },
    dayCenterContainer:{
        backgroundColor: Colors.secondary,
        flex: 4,
        padding: 10

    },
    centerText: {
        color: "#fff",
        fontSize: 15
    },
    dayRightContainer:{
        backgroundColor: Colors.surfaceSecondary,
        flex: 1,
        padding: 10,
        flexDirection: "column"
    }
})

export default Forecast;