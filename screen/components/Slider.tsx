import React from "react";
import styled from "styled-components/native";
import {StyleSheet, useColorScheme} from 'react-native'
import { BlurView } from "expo-blur";
import { imgPATH } from "./mini-Com/Utils";
import Poster from "./mini-Com/Poster";
import Score from "./mini-Com/Score";

const View = styled.View`
    flex : 1;
    `;
const BgImg = styled.Image`
    `;
const Wrapper = styled.View`
    flex-direction:  row;
    height: 100%;
    justify-content: center;
    align-items: center;
    `;
const Column = styled.View`
    width: 45%;
    margin-left: 20px;
    `;
const Title = styled.Text`
    color: ${props => props.theme.textColor};
    font-weight: 900;
    font-size: 20px;
    `;
const Overview = styled.Text`
    margin-top: 10px;
    color : ${props=>props.theme.tintColor};
    `;


interface SliderProps {
    backdrop_path: string;
    poster_path: string;
    original_title: string;
    vote_average: number;
    overview: string;
}

const Slider:React.FC<SliderProps> = (
    {   
        backdrop_path,
        poster_path,
        original_title,
        vote_average,
        overview,
    }
) => {
    const isDark = useColorScheme() === "dark";
    return (
    <View>
        <BgImg
           style={StyleSheet.absoluteFill}
           source={{uri:imgPATH(backdrop_path)}}/>
        <BlurView 
        intensity={120}
        tint = {isDark? 'dark':'light'}
        style={StyleSheet.absoluteFill}>
           <Wrapper>
               <Poster path={poster_path}/>
               <Column>
                   <Title>{original_title}</Title>
                    <Score vote_average = {vote_average}/>
                   <Overview>{overview.slice(0, 100)}...</Overview>
               </Column>
           </Wrapper>
        </BlurView>
    </View>)
}

export default Slider