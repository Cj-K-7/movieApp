
const API_KEY = "34161cf6d910bb2a80ad0681aa12722e"; 
const BASIC_URL = "https://api.themoviedb.org/3";

export interface Movie {
    adult : boolean;
    backdrop_path : string | null;
    genre_ids : number[];
    id : number;
    original_language : string;
    original_title : string;
    overview : string;
    popularity : number;
    poster_path : string | null;
    release_date : string;
    title : string;
    video : boolean;
    vote_average : number;
    vote_count : number;
}

export interface TV {
    adult : boolean;
    backdrop_path : string | null;
    genre_ids : number[];
    id : number;
    original_language : string;
    original_name : string;
    overview : string;
    popularity : number;
    poster_path : string | null;
    release_date : string;
    title : string;
    video : boolean;
    vote_average : number;
    vote_count : number;
}

interface BaseResponse {
    page : number;
    total_results : number;
    total_pages : number;
}

export interface MovieResponse extends BaseResponse {
    results : Movie[];
}

export interface TVResponse extends BaseResponse {
    results : TV[];
}

export const moviesAPI = {
  nowPlaying: () =>
    fetch(
      `${BASIC_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR `
    ).then((res) => res.json()),
  Trending: () =>
    fetch(
      `${BASIC_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1&region=KR `
    ).then((res) => res.json()),
  UpComing: () =>
    fetch(
      `${BASIC_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR `
    ).then((res) => res.json()),
  Search: ({queryKey}) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASIC_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
      ).then((res) => res.json());
    }
};


export const tvAPI = {
  Trending: () =>
    fetch(
      `${BASIC_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US&page=1&region=KR `
    ).then((res) => res.json()),
  Airing: () =>
    fetch(
      `${BASIC_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1&region=KR `
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${BASIC_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=KR `
    ).then((res) => res.json()),
  Search: ({queryKey}) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASIC_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
      ).then((res) => res.json());
  }
};