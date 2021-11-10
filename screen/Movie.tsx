import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Poster from "./components/mini-Com/Poster";
import Slider from "./components/Slider";
import Score from "./components/mini-Com/Score";
import HorizontalShowcase from "./components/Hor-Show";


const API_KEY = "34161cf6d910bb2a80ad0681aa12722e"


const Container = styled.ScrollView``;
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
const Trending = styled.ScrollView`
    margin-bottom : 25px;
    `;
const TrendingTitle = styled.Text`
    color : ${props=>props.theme.textColor};
    font-size: 20px;
    font-weight: bold;
    margin-left: 30px;
    margin-bottom: 25px;
    `;
const ComingSoon = styled.View`
    margin-left: 30px;
    `;
const ComingSoonTitle = styled.Text`
    color : ${props=>props.theme.textColor};
    font-size : 20px;
    font-weight: bold;
    `;
const CSmovie = styled.View`
    flex-direction : row;
    margin : 20px 0px;
    `;
const Column = styled.View`
    margin-left: 20px;
    width: 60%;
    height: 100%;
    `;
const Title =styled.Text`
    padding-top: 5px;
    font-size: 18px;
    font-weight: 800;
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

const SCREEN_HEIGHT = Dimensions.get("window").height;

const Moives: React.FC<NativeStackScreenProps<any, "Movies">> = () =>{
    const isDark = useColorScheme() === 'dark';
    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [upComing, setupComing] = useState([]);
    const [trending, setTrending] = useState([]);

    const getNowPlaying = async() => {
        const { results } = await (
            await fetch( 
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR `
                )
            ).json();

        setNowPlaying(results);
    };

    const getUpComing = async() => {
        const { results } = await (
            await fetch( 
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR `
                )
            ).json();

        setupComing(results)
    };

    const getTrending = async() => {
        const { results } = await (
            await fetch( 
                `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1&region=KR `
                )
            ).json();

        setTrending(results);
    };

    const getData = async () => {
        // 모두 기다리기 
        await Promise.all([getNowPlaying(), getUpComing(), getTrending()])
        setLoading(false);
    }

    useEffect(()=>{
        getData();
    }, []);


    return loading ? (
        <Loader>
            <ActivityIndicator size="large"/>
        </Loader>        
    ):(
        <Container>
            
            <Swiper
                horizontal
                autoplay
                autoplayTimeout={3}
                loop
                showsButtons={false}
                showsPagination={false}
                containerStyle={{marginBottom : 30, width : "100%", height : SCREEN_HEIGHT/3  }}
             >
                {nowPlaying.map(movie=>(
                <Slider
                    key={movie.id}
                    backdrop_path={movie.backdrop_path}
                    poster_path={movie.poster_path}
                    original_title={movie.original_title}
                    vote_average={movie.vote_average}
                    overview={movie.overview}
                 />
                ))}
            </Swiper>
            <Now>Now Play</Now>
            <TrendingTitle>Trending Movies</TrendingTitle>
               <Trending
                horizontal
                showsHorizontalScrollIndicator = {false}
                contentContainerStyle = {{marginLeft : 20}}
            >
                    {trending.map(movie=>(
                        <HorizontalShowcase 
                            key={movie.id}
                            poster_path={movie.poster_path}
                            original_title={movie.original_title}
                            vote_average={movie.vote_average}
                        />
                    ))}
            </Trending>
            <ComingSoon>
            <ComingSoonTitle>Coming Soon</ComingSoonTitle>
            {upComing.map(movie => (
                <CSmovie key={movie.id}>
                    <Poster path={movie.poster_path}/>
                    <Column>
                        <Title>{movie.original_title}</Title>
                        <Release>{movie.release_date}</Release>
                        <Overview>{movie.overview.slice(0, 180)}...</Overview>
                    </Column>
                </CSmovie>
            ))}
            </ComingSoon>
        </Container>
    )
    
}

export default Moives