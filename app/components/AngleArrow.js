import React from "react"
import { View, StyleSheet } from "react-native"

let circleSize = 100;
/**
 * Arrow component that is rendered at a certain angle. 
 * @param {color} String color of the arrow.
 * @param {circleSize} Number size of the circle that the arrow belongs to.
 * @param {angle} Number angle that the arrow will be displayed on the screen.
 * @returns Arrow component.
 */
const AngleArrow = (props) => {
    let color = props.color;
    circleSize = props.circleSize;
    return(
        <View style={{ transform: [ { scaleY: -1}, {translateY: -circleSize}, { scaleX: -1}]}}>
            <View style={[styles.arrow, {
                    height: (circleSize / 2), transform: [{translateY: (circleSize/2) / 2}, { rotate:  props.angle + "deg"}, {translateY: -(circleSize/2) /2}],
                }, {backgroundColor: color}]}>
                <View style={[styles.arrowTip, {borderBottomColor: color}]}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    arrow: {
        width: 2,
        left: "50%",
        right: "50%",
        position: "absolute"
    },
    arrowTip: {
        right: 9,
        top: 0,
        width: 0,
        height: 0,
        borderWidth:10,
        borderColor: "transparent",
        borderTopWidth: 0
    },
})

export default AngleArrow;