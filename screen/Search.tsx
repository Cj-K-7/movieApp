import React, { useState } from "react";
import styled from "styled-components/native";
import { moviesAPI, tvAPI } from "../api";
import { useQuery } from "react-query";
import Loader from "./components/mini-Com/Loader";
import HorList from "./components/Hor-List";

const Container = styled.View`
    `;
const SearchBar = styled.TextInput`
    background-color : ${(props)=>props.theme.naviBgColor};
    color: ${props=>props.theme.textColor};
    border-radius: 20px;
    width: 90%;
    margin: 10px auto;
    margin-bottom: 40px;
    padding: 8px 15px;
    `;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: isLoadingMovie,
    data : movieData,
    refetch: searchMovie,
  } = useQuery(["searchMovies", query], moviesAPI.Search, { enabled: false });
  const {
    isLoading: isLoadingTV,
    data: tvData,
    refetch: searchTV,
  } = useQuery(["searchTVs", query], tvAPI.Search, { enabled: false });

  const onSearchingText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovie();
    searchTV();
  };
  console.log(movieData, tvData);

  return (
    <Container>
      <SearchBar
        placeholder=" Search for Movie or TV shows"
        returnKeyType="search"
        onChangeText={onSearchingText}
        onSubmitEditing={onSubmit}
      />
      {isLoadingMovie || isLoadingTV ? <Loader/> : null}
      {movieData ? <HorList title = "Movies Results" data ={movieData.results}/> : null}
      {tvData ? <HorList title = "TV Results" data ={tvData.results}/> : null}
    </Container>
  );
};

export default Search