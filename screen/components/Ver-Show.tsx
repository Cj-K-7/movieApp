import React from "react";
import styled from "styled-components/native";
import Poster from "./mini-Com/Poster";
import Score from "./mini-Com/Score";
import { useNavigation } from "@react-navigation/native"
import { TouchableHighlight } from "react-native";
import { Movie } from "../../api";

const CSmovie = styled.View`
  padding: 0px 10px;
  flex-direction: row;
  justify-content: center;
`;
const Column = styled.View`
    margin-left: 20px;
    width: 60%;
    height: 160px;
    `;
const Title =styled.Text`
    padding-top: 5px;
    font-size: 18px;
    font-weight: bold;
    color : ${props=>props.theme.textColor};
    `;
const Release = styled.Text`
    color : ${props=>props.theme.textColor};
    font-weight: 500;
    `;
const Overview = styled.Text`
    margin-top: 5px;
    color : ${props=>props.theme.tintColor};
    `;

interface VS_Props {
    poster_path : string;
    original_title : string;
    release_date?: string;
    vote_average?: number
    overview : string;
    fullData : Movie
}

const Vertical_Showcase:React.FC<VS_Props> = (
    {
    poster_path,
    original_title,
    release_date,
    vote_average,
    overview,
    fullData
    }
) => {
    const navigation = useNavigation();
    const ToDetail = () => { 
        navigation.navigate("Stack", {
          screen: "Detail",
          params: { ...fullData },
        });
    }
     return (
         <TouchableHighlight onPress={ToDetail}>
                <CSmovie>
                    <Poster path={poster_path}/>
                    <Column>
                        <Title>{original_title}</Title>
                        <Release>{release_date}</Release>
                        {vote_average ? <Score vote_average={vote_average}/>:null}
                        <Overview>
                            {overview !== "" && overview.length > 120 ?
                             `${overview.slice(0, 120)}...`: overview}
                        </Overview>
                    </Column>
                </CSmovie>
        </TouchableHighlight>
            
        )
    }

export default Vertical_Showcase