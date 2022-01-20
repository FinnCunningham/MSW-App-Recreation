import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Colors from "../components/Colors";
import GlobalStyle from "../components/GlobalStyle";

/**
 * Returns a random number based on the inputs.
 * @param {min} Number minimum of the random number. 
 * @param {max} Number Maximum of the random number.
 * @returns Random Number
 */
const getRandomInt = (min, max) => {
  return((Math.random() * max) + min)
}

/**
 * Creates an headline article component.
 * @param {articleNumber} Number to decide what image to be shown.
 * @param {headline} String headline of the article.
 * @returns MainArticle component.
 */
const MainArticle = (props) => {
  return(
    <View style={styles.headlineContainer}>
      <View style={{height: "70%"}}>
        <Image style={{resizeMode: "stretch"}} source={{uri: "https://picsum.photos/300/?random" + props.articleNumber,
        width: "100%", 
        height: 190,}}/>
      </View>
      <View style={{flexDirection: "column", alignItems: "center"}}>
        <Text style={[{fontSize: 28, fontWeight: "bold", textAlign: "center"}, GlobalStyle.headerText]}>{props.headline}</Text>
      </View>
    </View>
  )
}

/**
 * Component of two small articles in a row. 
 * @param {headline1} String Title of the first article.
 * @param {headline2} String Title of the second article.
 * @param {timeAgo1} String Length of when the first article was posted.
 * @param {timeAgo2} String Length of when the second article was posted.
 * @returns RowArticle component.
 */
const RowArticle = (props) => {
  return(
    <View style={{flexDirection: "row", alignItems: "center", height: 200, width: "100%", flex: 1, padding: 4, left: 2}}>
      <SmallArticle headline={props.headline1} articleNumber={getRandomInt(0, 100)} timeAgo={props.timeAgo1}/>
      <SmallArticle headline={props.headline2} articleNumber={getRandomInt(0, 100)} timeAgo={props.timeAgo2}/>
    </View>
  )
}

/**
 * Component of article that goes in the rowArticle component.
 * @param {articleNumber} Number to decide what image to be shown.
 * @param {headline} String headline of the article.
 * @param {timeAgo} String Length of when the article was posted. 
 * @returns SmallArticle component.
 */
const SmallArticle = (props) => {
  return(
    <View style={{flex: 1, backgroundColor: Colors.surface, borderRadius: 0, padding: 4, flexDirection: "column", marginEnd: 5, marginBottom: 10}}>
      <View style={{alignItems: "center", width: "100%"}}>
        <Image style={{resizeMode: "stretch", borderRadius: 0}} source={{uri: "https://picsum.photos/300/?random" + props.articleNumber,
        width: "100%", 
        height: 130,}}/>
      </View>
      <View style={{top: 0, padding: 10}}>
        <Text style={[{fontSize: 15}, GlobalStyle.mediumText]}>{props.headline}</Text>
        <Text style={[{fontSize: 12}, GlobalStyle.smallText]}>{props.timeAgo}</Text>
      </View>
    </View>
  )
}
/**
 * News page of surfing articles.
 * @returns {MediaScreen} Articles related to surfing.
 */
const MediaScreen = () => {
    return (
        <ScrollView style={{flex: 1, backgroundColor: Colors.background}}>
          <MainArticle headline="EXCLUSIVE: Dangerous Waves" articleNumber={15}/>
          <RowArticle articleNumber={getRandomInt(0, 100)} headline1={"Travel"} headline2={"Making the call"}
          timeAgo1={"1h ago"} timeAgo2={"2h ago"}/>
          <RowArticle articleNumber={getRandomInt(0, 100)} headline1={"Hardware"} headline2={"Characters"}
          timeAgo1={"3h ago"} timeAgo2={"1h ago"}/>
          <RowArticle articleNumber={getRandomInt(0, 100)} headline1={"Surf better"} headline2={"Pulse"}
          timeAgo1={"1h ago"} timeAgo2={"30m ago"}/>
          <MainArticle headline="EXCLUSIVE: New issues arrive" articleNumber={16}/>
          <MainArticle headline="EXCLUSIVE: Cold waves fight back" articleNumber={18}/>
          <RowArticle articleNumber={getRandomInt(0, 100)} headline1={"Travel"} headline2={"Making the call"}
          timeAgo1={"1h ago"} timeAgo2={"2h ago"}/>
          <RowArticle articleNumber={getRandomInt(0, 100)} headline1={"Hardware"} headline2={"Characters"}
          timeAgo1={"3h ago"} timeAgo2={"4h ago"}/>
          <RowArticle articleNumber={getRandomInt(0, 100)} headline1={"Surf better"} headline2={"Pulse"}
          timeAgo1={"5h ago"} timeAgo2={"7h ago"}/> 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  headlineContainer:{
    height: 280,
    width: "100%",
    flex: 1,
    backgroundColor: Colors.surface,
    flexDirection: "column",
    alignContent: "flex-end",
    marginBottom: 10,
  }
})

export default MediaScreen;