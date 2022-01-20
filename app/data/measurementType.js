const GlobalMeasurements = {
    "metric": {
        longLength: "km",
        smallLength: "in",
        speed: "kph",
        temp: "c"
    },
    "imperial": {
        longLength: "mi",
        smallLength: "ft",
        speed: "mph",
        temp: "f"
    }
};

/**
 * Access the current global measurement type then retruns the measurement type 
 *  for the current screen in a state.
 * @param {getData} Async Storage function to access string based on key given.
 * @param {currentMeasurement} String measurement type. 
 * @param {setMeasureType} State set string to state. 
 */
const getMeasureType = (getData, currentMeasurement, setMeasureType) => {
    getData("measurementType").then((data)=>{
        if(data.length > 0){
            data = data.substring(1, data.length-1);
            if(data != currentMeasurement){
                setMeasureType(data);
            }
        }
    })
}
/**
 * Returns measurmentType nested Object.
 * @returns nested Object of measurment types and their conversion labels.
 */
const GetMeasures = () => {
    return GlobalMeasurements;
}

export {GetMeasures, getMeasureType};