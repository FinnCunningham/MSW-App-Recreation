import React, { useContext, useState, useEffect } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Context } from "../../Context";
import Colors from "../components/Colors";
import locationHelper from "../data/locationHelper";
import Icon from "react-native-vector-icons/FontAwesome";

/**
 * Button Component of each chart type.
 * @param {chartType} String State Type of chart being shown.
 * @param {pressType} String State chart that has been pressed. 
 * @param {setChartType} Function State changes the state chartType.
 * @param {title} String Title of the button.
 * @returns Button Component.
 */
const ChartSelectionItem = (props) => {
    let selected = false;
    if(props.chartType == props.pressType){
        selected = true;
    }
    return(
        <TouchableOpacity style={[{padding: 10, backgroundColor: Colors.secondary}, selected ? styles.selectedChart : {}]}
            onPress={()=>{
                props.setChartType(props.pressType);
            }}>
            <Text style={{fontSize: 15}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

/**
 * Chart Component of the current location to show all charts for forecast visual view.
 * @returns {ChartLocationScreen} Component to render chart view. 
 */
const ChartLocationScreen = () => {
    const [context, setContext] = useContext(Context);
    const [chartType, setChartType] = useState("swell")
    const [chartFrame, setChartFrame] = useState(0);
    const [MediaArray, setMediaArray] = useState([])
    const [active, setActive] = useState(false);
    let playIcon = "pause" 
    if(!active){
        playIcon = "play"
    }
    let locationData = locationHelper()[context.location];
   
    if(locationData == undefined){
        locationData = locationHelper()["Bournemouth"];
    }

    useEffect(() => {
        nextFrame();
    }, [active])
    useEffect(() => {
        setChartFrame(0)
        let maps = locationData.map(location => {
            if(chartType != "sst"){
                Image.prefetch(location["charts"][chartType])
            }
            return <Image  style={{alignSelf: "center"}} source={{
                uri: location["charts"][chartType], width: "90%", height: 300
            }}/>
        })
        setMediaArray(maps)
    }, [chartType])
    useEffect(() => {
        if(active){
            setTimeout(()=>{
                nextFrame();
            }, 700)
        }
    }, [chartFrame])
    useEffect(() => {
        setMediaArray(locationData.map(location => {
            Image.prefetch(location["charts"][chartType])
            return <Image  style={{alignSelf: "center"}} source={{
                uri: location["charts"][chartType], width: "90%", height: 300
            }}/>
        }))
    }, [])
    /**
     * Changes the current chart frame to get the next image to show it like a video.
     */
    const nextFrame = () => {
        let current = chartFrame;
        if(chartType != "sst"){
            if(current < locationData.length-1){
                current += 1;
                setChartFrame(current)
            }else{
                //MAX frames
                playIcon = "play"
                setActive(false)
            } 
        }        
    }
    return(
        <View style={{flex: 1}}>
            {MediaArray[chartFrame]}
            <View style={styles.chartSelectionContainer}>
                <ChartSelectionItem title={"Swell"} pressType={"swell"} setChartType={setChartType} chartType={chartType}/>
                <ChartSelectionItem title={"Wind"} pressType={"wind"} setChartType={setChartType} chartType={chartType}/>
                <ChartSelectionItem title={"Period"} pressType={"period"} setChartType={setChartType} chartType={chartType}/>
                <ChartSelectionItem title={"Pressure"} pressType={"pressure"} setChartType={setChartType} chartType={chartType}/>
                <ChartSelectionItem title={"SST"} pressType={"sst"} setChartType={setChartType} chartType={chartType}/>
            </View> 
            <TouchableOpacity
            onPress={()=>{
                let tempActive = active;
                tempActive = !tempActive
                setActive(tempActive)
            }}
            >
                <Icon name={playIcon} size={25} color='#4a4a4a' style={{left: "45%", top: 10}}/>
            </TouchableOpacity> 
        </View>
    );
}

const styles = StyleSheet.create({
    chartSelectionContainer: {
        flexDirection: "row",
        width: "95%",
        justifyContent: "space-between",
        alignSelf: "center",
        bottom: 50,
        position: "absolute"
    },
    selectedChart:{
        backgroundColor: Colors.primary
    }
})

export default ChartLocationScreen;