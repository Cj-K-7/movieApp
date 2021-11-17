import React from "react";
import styled from "styled-components/native";
import Poster from "./mini-Com/Poster";
import Score from "./mini-Com/Score";
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native";
import { Movie, TV } from "../../api";

const MovieView = styled.View`
    align-items: center;
    justify-content: center;
    `;
const MovieTitle = styled.Text`
    margin-top: 5px;
    font-size : 14px;
    font-weight: 700;
    color : ${props=>props.theme.textColor};
    `;


interface HS_Props {
    poster_path : string;
    original_title : string;
    vote_average : number;
    fullData : Movie | TV;
}

const HorizontalShowcase: React.FC<HS_Props> = (
    {
        poster_path,
        original_title,
        vote_average,
        fullData
    }
) =>{
    const navigation = useNavigation();
    const ToDetail = () => { 
        navigation.navigate("Stack", {
          screen: "Detail",
          params: { ...fullData },
        });
    }
    return (
            <TouchableOpacity onPress = {ToDetail}>
                    <MovieView>
                        <Poster path={poster_path}/>
                        <MovieTitle>
                            {original_title.slice(0, 13)}
                            {original_title.length > 13 ? "...":null}
                        </MovieTitle>
                        <Score vote_average = { vote_average }/>
                    </MovieView>
            </TouchableOpacity>
    )
}

export default HorizontalShowcase;