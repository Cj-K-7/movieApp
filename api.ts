
const API_KEY = "34161cf6d910bb2a80ad0681aa12722e"; 
const BASIC_URL = "https://api.themoviedb.org/3";

export interface Movie {
    adult : boolean;
    backdrop_path : string | null;
    genre_ids : number[];
    id : number;
    orginal_language : string;
    orginal_title : string;
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

const movie_NowPlaying = () => 
    fetch( `${BASIC_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR `
            ).then(res => res.json());

const movie_UpComing = () => 
        fetch( 
            `${BASIC_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR `
        ).then(res => res.json());
        
const movie_Trending = () => 
         fetch( 
            `${BASIC_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1&region=KR `
            ).then(res => res.json());


export const moviesAPI = { movie_NowPlaying, movie_Trending, movie_UpComing };