import React, { useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import { tvAPI } from "../api";
import Loader from "./components/mini-Com/Loader";
import { RefreshControl, ScrollView } from "react-native";
import HorList from "./components/Hor-List";


const TV = () =>{
    const queryClient = useQueryClient()
    const [refreshing, setRefreshing] = useState(false);
    const {
      isLoading: todayLoading,
      data: todayData,
    } = useQuery(["tv", "today"], tvAPI.Airing);
    const {
      isLoading: topLoading,
      data: topData,
    } = useQuery(["tv", "top"], tvAPI.topRated);
    const {
      isLoading: trendingLoading,
      data: trendingData,
    } = useQuery(["tv", "trending"], tvAPI.Trending);

    const onRefresh = async () => {
      setRefreshing(true);
      await queryClient.refetchQueries(["tv"]);
      setRefreshing(false);
    };

    const loading = todayLoading || topLoading || trendingLoading;
    

    if ( loading ) {
        return <Loader/>;
    }
    return (
      <ScrollView 
        refreshControl={
            <RefreshControl refreshing ={ refreshing } onRefresh ={onRefresh}/>
            }>
        <HorList title="Trending TV" data={trendingData.results} />
        <HorList title="Airing Today" data={todayData.results}/>
        <HorList title="Top Rated TV" data={topData.results}/>
      </ScrollView>
    );
    
}

export default TV