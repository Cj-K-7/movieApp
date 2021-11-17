import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {useState} from "react";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slider from "./components/Slider";
import Vertical_Showcase from "./components/Ver-Show";
import { useQuery, useQueryClient } from "react-query";
import { MovieResponse, moviesAPI } from "../api";
import Loader from "./components/mini-Com/Loader";
import HorList from "./components/Hor-List";

const Container = styled.FlatList``;

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
const VSeparator = styled.View`height : 20px;`;
const ComingSoonTitle = styled.Text`
    color : ${props=>props.theme.textColor};
    margin-left: 30px;
    margin-bottom: 20px;
    font-size : 20px;
    font-weight: bold;
    `;

const SCREEN_HEIGHT = Dimensions.get("window").height;

const Moives: React.FC<NativeStackScreenProps<any, "Movies">> = () =>{
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const {
       isLoading : nowPlayingLoading,
       data: nowPlayingData,
      }
     = useQuery<MovieResponse>(["movies","nowPlayng"], moviesAPI.nowPlaying );
    const {
       isLoading : UpComingLoading,
       data: UpComingData,
      }
     = useQuery<MovieResponse>(["movies","upComing"], moviesAPI.UpComing );
    const {
       isLoading : TrendingLoading,
       data: TrendingData,
      }
     = useQuery<MovieResponse>(["movies","trending"], moviesAPI.Trending );

    const onRefresh = async() => {
      setRefreshing(true);
      await queryClient.refetchQueries(["movies"])
      setRefreshing(false);
    }

    const loading = nowPlayingLoading || UpComingLoading || TrendingLoading 

    const renderVS = ({ item }) => (
      <Vertical_Showcase
        poster_path={item.poster_path}
        original_title={item.original_title}
        release_date={item.release_date}
        vote_average={item.vote_average}
        overview={item.overview}
        fullData={item}
      />
    );

    return loading ? (
      <Loader/>
    ) : UpComingData ?(
      <Container
        data={UpComingData.results}
        renderItem={renderVS}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.id + ""}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <VSeparator/>}
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
                width: "100%",
                height: SCREEN_HEIGHT / 3,
              }}
            >
              {nowPlayingData?.results.map((movie) => (
                <Slider
                  key={movie.id}
                  backdrop_path={movie.backdrop_path || ""}
                  poster_path={movie.poster_path || ""}
                  original_title={movie.original_title}
                  vote_average={movie.vote_average}
                  overview={movie.overview}
                  fullData={movie}
                />
              ))}
            </Swiper>
            <Now>Now Play</Now>
               {TrendingData ? <HorList title="Trending Movies" data={TrendingData.results} />: null }
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
          </>
        }
      /> 
    ) : null
};

export default Moives