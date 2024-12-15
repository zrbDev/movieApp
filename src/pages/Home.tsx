import React, { useEffect, useMemo } from "react";
import MovieGrid from "../components/MovieGrid.tsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import {
  setMovies,
  setLoading,
  setTotalResults,
} from "../redux/moviesSlice.ts";
import { Box } from "@mui/material";
import SearchBar from "../components/SearchBar.tsx";

type Props = {};

const API_KEY = "e53c26c9";

interface Movie {
  imdbID: string;
  Type: string;
  Title: string;
  Year: string;
}

const Home = (props: Props) => {
  //   const [movies, setMovies] = useState([]); // Store movie data
  //   const [loading, setLoading] = useState(false); // Loading state
  //   const [totalResults, setTotalResults] = useState(0); // Total movies count
  //   const [searchQuery, setSearchQuery] = useState("Pokemon"); // Search query
  //   const [year, setYear] = useState("");
  //   const [filterType, setFilterType] = useState(""); // Filter by type (movie, series, episode)
  //   const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
  //     page: 0, // İlk sayfa (0 tabanlı)
  //     pageSize: 10, // Sayfa başına 10 öğe
  //   });
  const dispatch = useDispatch();

  const {
    movies,
    totalResults,
    searchQuery,
    year,
    filterType,
    paginationModel,
  } = useSelector((state: RootState) => state.movies);

  const columns: any = [
    { field: "id", headerName: "IMDb ID", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "title", headerName: "Name", flex: 2 },
    { field: "year", headerName: "Release Year", flex: 1 },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setLoading(true));
      console.log("paginationModel?.page", paginationModel?.page);
      try {
        const response = await axios.get("http://www.omdbapi.com/", {
          params: {
            apikey: API_KEY,
            s: searchQuery,
            y: year,
            page: paginationModel?.page + 1,
            type: filterType, // Optional: movie, series, or episode
          },
        });

        if (response.data.Response === "True") {
          dispatch(setMovies(response.data.Search));
          dispatch(setTotalResults(parseInt(response.data.totalResults, 10)));
        } else {
          dispatch(setMovies([]));
          dispatch(setTotalResults(0));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMovies();
  }, [searchQuery, year, filterType, paginationModel, dispatch]);

  const rows: any = useMemo(
    () =>
      movies.map((movie: Movie) => ({
        id: movie.imdbID,
        type: movie.Type,
        title: movie.Title,
        year: movie.Year,
      })),
    [movies]
  );

  console.log("rows", rows);

  return (
    <Box>
      <SearchBar />
      <Box />
      {rows && rows.length > 0 && columns && (
        <MovieGrid
          rows={rows || []}
          columns={columns}
          totalResults={totalResults}
        />
      )}
    </Box>
  );
};

export default Home;
