import React, {useContext} from "react";
import { Context } from "../../Context";
import { View, ScrollView, Text, TouchableOpacity } from "react-native"
import Forecast from "../components/Forecast";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

/**
 * This renders the wind/swell forecast of the week.
 * @returns {ForecastScreen} Forecast component.
 */
const ForecastScreen = () => {
    const navigation = useNavigation();
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const [context, setContext] = useContext(Context);
    let day = context.day; 
    let index = days.indexOf(day);
    let sliceEnd = days.slice(0, index)
    let sliceStart = days.slice(index, days.length)
    days = [...sliceStart, ...sliceEnd]
    let renderDays = [];
    let count = 0;
    days.forEach(localDay => {
        renderDays.push(<Text key={"Text " + count} style={{textAlign: "center"}}>{localDay}</Text>)
        renderDays.push(<Forecast dayIndex={count} styling={{flex: 1}} key={count} locationData={context.locationData}
            measureType={context.measureType} GlobalMeasurementTypes={context.GlobalMeasurementTypes}/>)
        count++;
    });

    return(
        <View style={{flex: 1}}>
            <TouchableOpacity style={{backgroundColor: "lightblue", width: 50, height: 50, borderRadius: 50, left: 5, top: 5, marginBottom: 10}}
            onPress={() =>{
                navigation.pop();
            }}
            >
                <Icon name='chevron-left' size={30} color='#fff' key={1} style={{left: 12, top: 10}}/>
            </TouchableOpacity>
            <ScrollView>
                {renderDays}
            </ScrollView>
        </View>
    )
}

export default ForecastScreen;