import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, Linking, Platform, Share, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { Movie, moviesAPI, TV, tvAPI } from "../../api";
import Poster from "../components/mini-Com/Poster";
import Score from "../components/mini-Com/Score";
import { imgPATH } from "../components/mini-Com/Utils";
import { LinearGradient } from 'expo-linear-gradient';
import { darkTheme } from "../../styled";
import { lightTheme } from "../../styled";
import { useQuery } from "react-query";
import Loader from "../components/mini-Com/Loader";
import { Ionicons } from "@expo/vector-icons";

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
`;
const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Row = styled.View`
  margin-left: 20px;
  padding-bottom: 8px;
  align-self: flex-end;
`;

const Body = styled.View`
  padding: 0px 20px;
`;
const OverView = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 15px;
  margin-bottom: 20px;
`;
const VideoURL = styled.Text`
  color: ${(props) => props.theme.tintColor};
  font-weight: 600;
  line-height: 25;
  margin-left: 12px;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

type RootStackParams = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParams, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const sharing = async () =>{
    const isAndroid = Platform.OS === "android";
    const hompage = isMovie
    ? `https://www.imdb.com/title/${data.imdb_id}`
    : data.hompage;

    if(isAndroid) {
      await Share.share({
        url: hompage,
        message: `${params.overview}\n Check this out : ${hompage}`,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    } else {
      
      await Share.share({
        url: hompage,
        title:
        "original_title" in params
        ? params.original_title
        : params.original_name,
      });
    }
  }
  const ShareButton = () => (
    <TouchableOpacity onPress={sharing}>
      <Ionicons name="share-outline" color="white" size={28} />
    </TouchableOpacity>
  );
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movie" : "tv", params.id],
    isMovie ? moviesAPI.Detail : tvAPI.Detail
  );
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV show",
    });
  },[]);
  useEffect(()=> {
    if(data) {
      setOptions(
        {headerRight: ()=><ShareButton/>}
      );
    }
  },[data])

  const openURL = async (videoID: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
    await Linking.openURL(baseUrl);
  };
  const isDark = useColorScheme() === "dark";

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
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.slice(0, 4).map((video) => (
          <VideoBtn key={video.key} onPress={() => openURL(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={25} />
            <VideoURL>{video.name}</VideoURL>
          </VideoBtn>
        ))}
      </Body>
    </Container>
  );
};

export default Detail;