import React from "react"
import { View, Text } from "react-native";
import { AreaChart, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import getTideTimes from "../data/tide";

/**
 * Creates the tide chart component.
 * @returns {TideChart} Component.
 */
const TideChart = () => {
    let tideTimes = getTideTimes();

    return(
        <View style={{flex: 1}}>
            <Text style={{textAlign: "center", fontSize: 22}}>Tide Height</Text>
            <Text style={{textAlign: "center", fontSize: 13}}>(Every other hour)</Text>
            <View style={{bottom: 0, position: "absolute", width: "100%"}}>
                <AreaChart
                    style={{ height: 130, paddingRight: -20 }}
                    data={ tideTimes }
                    yAccessor={ ({ item }) => item.y }
                    xAccessor={ ({ item }) => item.x }
                    svg={{ fill: 'lightblue' }}
                    curve={ shape.curveNatural }
                    gridMax={ 3 }
                    gridMin={ 0 }
                >
                </AreaChart>
                <XAxis 
                    style={{paddingTop: 2}}
                    data={tideTimes}
                    formatLabel={(index) => {if(index%2)return index}}
                    contentInset={{ left: 0, right: 10 }}
                    svg={{ fontSize: 12, fill: 'black' }}
                />
            </View>
        </View>
    )   
}
export default TideChart;