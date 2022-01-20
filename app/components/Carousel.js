import React, { useRef, useState } from "react";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import GlobalStyle from "./GlobalStyle";

/**
 * Item component of carousel.
 * @param {scroll} Function scrolls on press.
 * @param {index} Number day of array index.
 * @param {newStyle} Object style sent to the component.
 * @param {selected} Boolean whether it is selected or not.
 * @param {day} String Day of week.
 * @returns {Item} Day item in carousel.
 */
const Item = (props) => {
    return(
        <TouchableOpacity
        onPress={()=> {
            props.scroll(props.index);
        }}>
            <Text style={[styles.text, props.newStyle, props.selected ? styles.selectedText: {}, GlobalStyle.headerText]}>{props.day}</Text>
        </TouchableOpacity>
    )
}
/**
 * @param {days} Array[String] array of days.
 * @param {day} String Current day.
 * @param {changeDay} Function State that changes current day. 
 * @returns {Carousel} ScrollView component.
 */
const Carousel = (props) => {
    const scrollRef = useRef(null);
    const [selectedDay, setSelectedDay] = useState(0);
    const interval = 170;
    let currentIndex = 0;
    let days = props.days;
    let index = days.indexOf(props.day);
    let sliceEnd = days.slice(0, index)
    let sliceStart = days.slice(index, days.length)
    /**
     * Scrolls to the item that was clicked.
     * @param {clickedIndex} Number index of the item that was clicked.  
     */
    const scroll = (clickedIndex) => {
        scrollRef.current.scrollTo({ x: clickedIndex * interval})
        currentIndex = clickedIndex;
        props.changeDay(currentIndex, days);
        setSelectedDay(currentIndex);
    };
    days = [...sliceStart, ...sliceEnd]

    /**
     * Creates an array of item components.
     * @returns Array[<Item/>]
     */
    const createItemList = () => {
        let itemList = [];
        for(let i=0;i < 7;i++){
            let newStyle;
            if(i == 0){
                newStyle = {marginStart: 10};
            }else if(i==6){
                newStyle = {marginEnd: 230}
            }
            if(i == selectedDay){
                itemList.push(<Item day={days[i]} index={i} scroll={scroll} newStyle={newStyle} key={i} selected={true}/>)
            }else{
                itemList.push(<Item day={days[i]} index={i} scroll={scroll} newStyle={newStyle} key={i} selected={false}/>)
            }
        }
        return itemList;
    }
    let listItems = createItemList();

    return(
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={interval}
            ref={scrollRef}
            onMomentumScrollEnd={data =>{
                currentIndex = Math.ceil(data.nativeEvent.contentOffset.x / interval);
                props.changeDay(currentIndex, days);
                setSelectedDay(currentIndex);
            }}
        >
            <View style={{flexDirection: "row"}}>
                {listItems}
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize: 25,
        marginEnd: 20,
        flexDirection: "row",
        width: 150,
        color: "#000"
    },
    selectedText:{
        fontSize: 30,
        color: "#2b2b2b"
    }
})

export default Carousel;