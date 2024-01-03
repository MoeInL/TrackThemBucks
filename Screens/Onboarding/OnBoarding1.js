import { View, StyleSheet } from "react-native";
import { useState } from "react";

import ImageSlideShow from "../../Components/OnboardingComponents/ImageSlideShow";
import TitleText from "../../Components/OnboardingComponents/TitleText";
import SmallText from "../../Components/OnboardingComponents/SmallText";
import Dots from "../../Components/OnboardingComponents/dots";
import CustomButton from "../../Components/OnboardingComponents/CustomButton";

export default function OnBoarding1({navigation}) {
    const images= [require("../../assets/Images/Illustration1.png"), require("../../assets/Images/Illustration2.png"), require("../../assets/Images/Illustration3.png")]
    const titleText = ["Gain total control of your money", "Know where your money goes", "Planning ahead"]
    const smallText = ["Become your own money manager and make every cent count", "Track your transaction easily, with categories and financial report" ,"Setup your budget for each category so you in control"]
    const [image, setImage] = useState(images[0])

    function switchImages(){
        if(image === images[2]){
            setImage(images[0])
        }
        else
            setImage(images[images.indexOf(image) + 1])
    }

    function dotActive(index){
        return image === images[index]? true: false
    }

    function titleTextActive(){
        if(image === images[0]){
            return <TitleText text = {titleText[0]}/>
        }
        else if(image === images[1]){
            return <TitleText text = {titleText[1]}/>
        }
        else{
            return <TitleText text = {titleText[2]}/>
        }
    }

    function smallTextActive(){
        if(image === images[0]){
            return <SmallText text = {smallText[0]}/>
        }
        else if(image === images[1]){
            return <SmallText text = {smallText[1]}/>
        }
        else{
            return <SmallText text = {smallText[2]}/>
        }
    }

    return(
        <View style = {styles.screenStyle}>
            <ImageSlideShow path = {image} onSwitch = {switchImages}/>

            <View>
                {titleTextActive()}
                {smallTextActive()}
            </View>

            <View style = {styles. dotsView}>
                <Dots active = {dotActive(0)? true: false}/>
                <Dots active = {dotActive(1)? true: false}/>
                <Dots active = {dotActive(2)? true: false}/>
            </View>

            <View style = {styles. bttnView}>
                <CustomButton text = "Sign Up" onPress={() => navigation.navigate("SignUp")}/>
                <CustomButton text = "Login" onPress={() => navigation.navigate("Login")}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle: {
        flex: 1,
        padding: "5%",
        marginTop: 50,
        gap: 20,
    },

    dotsView: {
        flexDirection: "row",
        justifyContent: "center",
    },

    bttnView: {
        gap: 15,
    }
})