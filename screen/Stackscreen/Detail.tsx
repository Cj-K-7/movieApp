import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../../api";
import Poster from "../components/mini-Com/Poster";
import Score from "../components/mini-Com/Score";
import { imgPATH } from "../components/mini-Com/Utils";
import { LinearGradient } from 'expo-linear-gradient';
import { darkTheme } from "../../styled";
import { lightTheme } from "../../styled";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;
const BG = styled.Image``;
const Header = styled.View`
  justify-content: flex-end;
  height: ${SCREEN_HEIGHT / 3}px;
  margin-bottom: 20px;
  padding: 0px 25px;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 36px;
  font-weight: 600;
  text-shadow: 1px 1px 3px rgba(10, 250, 255, 0.7);
  width: 80%;
`;
const Column = styled.View`
  flex-direction: row;
`;
const Row = styled.View`
  margin-left : 20px;
  padding-bottom: 8px;
  align-self: flex-end;
`;

const Body = styled.View`
  padding: 0px 20px;
`;
const OverView = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 15px;
`;


type RootStackParams = { 
    Detail : Movie | TV;
}

type DetailScreenProps = NativeStackScreenProps<RootStackParams, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
    navigation : { setOptions },
    route: { params }
    }) => {
        useEffect(()=> {
            setOptions({
                title : "original_title" in params 
                ? "Movie"
                : "TV show",
            })
        }, []);

        const isDark = useColorScheme() === 'dark';

    return (
      <Container>
        <Header>
          <BG
            style={StyleSheet.absoluteFill}
            source={{ uri: imgPATH(params.backdrop_path) }}
          />
          <LinearGradient
            colors={[
              "transparent",
              isDark ? darkTheme.mainBgColor : lightTheme.mainBgColor,
            ]}
            style={StyleSheet.absoluteFill}
          />
          <Column>
            <Poster path={params.poster_path || ""} />
            <Row>
              <Score vote_average={params.vote_average || null} />
              <Title>{params.original_title ?? params.original_name}</Title>
            </Row>
          </Column>
        </Header>
        <Body>
          <OverView>{params.overview}</OverView>
        </Body>
      </Container>
    );
}

export default Detail