import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieState {
  movies: any[]; // Film verileri
  movieDetail: {
    Title: string;
    Year: number;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Language: string;
    Awards: string;
    Poster: string; // URL of the poster
    imdbRating: string;
    imdbID: string;
    BoxOffice?: string; // Optional since it might not always be available
    Response: boolean;
  };
  loading: boolean; // Yükleniyor durumu
  totalResults: number; // Toplam sonuç sayısı
  searchQuery: string; // Arama sorgusu
  year: string; // Yıl
  filterType: string; // Filtre tipi (movie, series, episode)
  paginationModel: {
    page: number;
    pageSize: number;
  }; // Sayfalama modeli
}

const initialState: MovieState = {
  movies: [],
  movieDetail: {
    Title: "",
    Year: 0,
    Runtime: "",
    Genre: "",
    Director: "",
    Actors: "",
    Plot: "",
    Language: "",
    Awards: "",
    Poster: "", // URL of the poster
    imdbRating: "",
    imdbID: "",
    BoxOffice: "", // Optional since it might not always be available
    Response: false,
  },
  loading: false,
  totalResults: 0,
  searchQuery: "Pokemon",
  year: "",
  filterType: "",
  paginationModel: {
    page: 0,
    pageSize: 10,
  },
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<any[]>) => {
      state.movies = action.payload;
    },
    setMovieDetail: (
      state,
      action: PayloadAction<{
        Title: string;
        Year: number;
        Runtime: string;
        Genre: string;
        Director: string;
        Actors: string;
        Plot: string;
        Language: string;
        Awards: string;
        Poster: string; // URL of the poster
        imdbRating: string;
        imdbID: string;
        BoxOffice?: string; // Optional since it might not always be available
        Response: boolean;
      }>
    ) => {
      state.movieDetail = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTotalResults: (state, action: PayloadAction<number>) => {
      state.totalResults = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setFilterType: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload;
    },
    setPaginationModel: (
      state,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) => {
      state.paginationModel = action.payload;
    },
  },
});

export const {
  setMovies,
  setMovieDetail,
  setLoading,
  setTotalResults,
  setSearchQuery,
  setYear,
  setFilterType,
  setPaginationModel,
} = moviesSlice.actions;

export default moviesSlice.reducer;
