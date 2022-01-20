import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, CheckBox } from "react-native"
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyle from "../components/GlobalStyle";
/**
 * Stores string value in Async Storage based on the value and key given.
 * @param {value} String to be set inside Async Storage. 
 * @param {key} String of the key of the Async Storage wanted.
 */
const storeData = async (value, key) => {  
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {}
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

/**
 * Settings screen for setting global settings.
 * @returns {SettingsScreen} settings component 
 */
const SettingsScreen = () => {
    const navigation = useNavigation();
    const [measurements, setMeasurements] = useState({
        metric: true,
        imperial: false,

    });
    useEffect(() => {
        getData("measurementType").then((data)=>{
            if(data.length > 0){
                if(data == '"metric"'){
                    setMeasurements({
                        metric: true,
                        imperial: false,
                    })
                }else{
                    setMeasurements({
                        metric: false,
                        imperial: true,
                    })
                }
            }else{
                setMeasurements({
                    metric: true,
                    imperial: false,
                })
            }
        })
    }, [])
    /**
     * Sets type of measurement for global settings.
     * @param {type} String measurment type  
     */
    const changeMeasurments = (type) => {
        if(type == "metric"){
            storeData("metric", "measurementType")
            setMeasurements({
                metric: true,
                imperial: false,
            })
        }else{
            storeData("imperial", "measurementType")
            setMeasurements({
                metric: false,
                imperial: true,
            })
        }
    }
    return(
        <View style={{flex: 1, padding: 10}}>
            <TouchableOpacity style={{backgroundColor: "lightblue", width: 50, height: 50, borderRadius: 50, left: 5, top: 5, marginBottom: 10}}
            onPress={() =>{
                navigation.pop();
            }}
            >
                <Icon name='chevron-left' size={30} color='#fff' key={1} style={{left: 12, top: 10}}/>
            </TouchableOpacity>
            <Text style={[{textAlign: "center", fontSize: 20, marginBottom: 15}, GlobalStyle.headerText]}>Measurement type</Text>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                
                <TouchableOpacity style={[{padding: 10, flex: 1}, measurements.metric ? styles.selected : {} ]}
                onPress={()=> changeMeasurments("metric")}
                >
                    <Text style={[{fontSize: 20, textAlign: "center"}, GlobalStyle.smallText]}>Metric</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{padding: 10, flex: 1}, measurements.imperial ? styles.selected : {} ]}
                onPress={()=> changeMeasurments("imperial")}
                >
                    <Text style={[{fontSize: 20, textAlign: "center"}, GlobalStyle.smallText]}>Imperial</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxStyle:{
       
    },
    selected:{
        backgroundColor: "pink"
    }
})
export default SettingsScreen;