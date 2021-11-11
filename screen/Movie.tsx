import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, RefreshControl, StyleSheet, useColorScheme, View } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slider from "./components/Slider";
import HorizontalShowcase from "./components/Hor-Show";
import Vertical_Showcase from "./components/Ver-Show";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesAPI } from "../api";


const Container = styled.FlatList``;
const Loader = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
    `;
const Now = styled.Text`
    position: absolute;
    transform: rotate(-30deg);
    top: 22px;
    left: 6px;
    font-size: 26px;
    font-weight: bold;
    color : rgba(10, 250, 255, 0.9);
    text-shadow: 1px 1px 3px rgba(10, 250, 255, 0.7);
    `;
const TrendingContainer = styled.View``;
const TrendingFlat = styled.FlatList`
    margin-bottom: 30px;
    `;
const TrendingTitle = styled.Text`
    color : ${props=>props.theme.textColor};
    margin-left: 35px;
    margin-bottom: 20px;
    font-size : 20px;
    font-weight: bold;
    `;
const VSeparator = styled.View`height : 20px;`;
const HSeparator = styled.View`width : 20px;`;
const ComingSoonTitle = styled.Text`
    color : ${props=>props.theme.textColor};
    margin-left: 35px;
    margin-bottom: 20px;
    font-size : 20px;
    font-weight: bold;
    `;

const SCREEN_HEIGHT = Dimensions.get("window").height;

const Moives: React.FC<NativeStackScreenProps<any, "Movies">> = () =>{
    const queryClient = useQueryClient();
    const {
       isLoading : nowPlayingLoading,
       data: nowPlayingData,
       isRefetching : isRefetchingnowPlaying
      }
     = useQuery<MovieResponse>(["movies","nowPlayng"], moviesAPI.movie_NowPlaying );
    const {
       isLoading : UpComingLoading,
       data: UpComingData,
       isRefetching : isRefetchingUpComing
      }
     = useQuery<MovieResponse>(["movies","upComing"], moviesAPI.movie_UpComing );
    const {
       isLoading : TrendingLoading,
       data: TrendingData,
       isRefetching : isRefetchingTrending
      }
     = useQuery<MovieResponse>(["movies","trending"], moviesAPI.movie_Trending );

    const onRefresh = async() => {
      queryClient.refetchQueries(["movies"])
    }

    const renderHS = ({ item })=>(
        <HorizontalShowcase 
        poster_path={item.poster_path}
        original_title={item.original_title}
        vote_average={item.vote_average}
        />
    );
    const renderVS = ({ item })=>(
        <Vertical_Showcase
            poster_path={item.poster_path}
            original_title={item.original_title}
            release_date={item.release_date}
            vote_average={item.vote_average}
            overview={item.overview}
        />
    )

    const loading = nowPlayingLoading || UpComingLoading || TrendingLoading 
    const refreshing = isRefetchingnowPlaying || isRefetchingUpComing || isRefetchingTrending
    console.log(refreshing);

    return loading ? (
      <Loader>
        <ActivityIndicator size="large" />
      </Loader>
    ) : (
      UpComingData ? <Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.id + ""}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <HSeparator/>}
        ListHeaderComponent={
          <>
            <Swiper
              horizontal
              autoplay
              autoplayTimeout={2.5}
              loop
              showsButtons={false}
              showsPagination={false}
              containerStyle={{
                marginBottom: 30,
                width: "100%",
                height: SCREEN_HEIGHT / 3,
              }}
            >
              {nowPlayingData?.results.map((movie) => (
                <Slider
                  key={movie.id}
                  backdrop_path={movie.backdrop_path || ""}
                  poster_path={movie.poster_path || ""}
                  original_title={movie.orginal_title}
                  vote_average={movie.vote_average}
                  overview={movie.overview}
                />
              ))}
            </Swiper>
            <Now>Now Play</Now>
            <TrendingContainer>
              <TrendingTitle>Trending Movies</TrendingTitle>
              {TrendingData ? <TrendingFlat
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id + ""}
                contentContainerStyle={{ paddingHorizontal: 30 }}
                ItemSeparatorComponent={() =><VSeparator/>}
                data={TrendingData.results}
                renderItem={renderHS}
              /> : null }
            </TrendingContainer>
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
          </>
        }
        data={UpComingData.results}
        renderItem={renderVS}
      /> : null 
    );
    
}

export default Moives