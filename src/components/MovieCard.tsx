import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/MovieCard.scss";
import { Box, CircularProgress } from "@mui/material";
import { RootState } from "../redux/store";
import { setMovieDetail, setLoading } from "../redux/moviesSlice.ts";
import axios from "axios";

type Props = {};

const API_KEY = "e53c26c9";

export interface MovieDetail {
  Title: string;
  Year: number;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
  BoxOffice?: string;
  Response: boolean;
}

const MovieCard = (props: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { movieDetail, loading, paginationModel } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    console.log("id", id);
    const fetchMovieDetails = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get("http://www.omdbapi.com/", {
          params: {
            apikey: API_KEY,
            i: id,
            page: paginationModel?.page + 1,
          },
        });

        if (response.data.Response === "True") {
          dispatch(setMovieDetail(response.data));
        } else {
          const defaultMovieDetail: MovieDetail = {
            Title: "",
            Year: 0,
            Runtime: "",
            Genre: "",
            Director: "",
            Actors: "",
            Plot: "",
            Language: "",
            Awards: "",
            Poster: "",
            imdbRating: "",
            imdbID: "",
            BoxOffice: "",
            Response: false,
          };
          dispatch(setMovieDetail(defaultMovieDetail));
          console.error(response.data.error);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMovieDetails();
  }, [id, paginationModel, dispatch]);

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!movieDetail.Response) {
    return <p>Movie details not found!</p>;
  }

  return (
    movieDetail.Response && (
      <div className="movie-details-container">
        <div className="poster">
          <img src={movieDetail.Poster} alt={movieDetail.Title} />
        </div>
        <div className="details">
          <h2>{movieDetail.Title}</h2>
          <p className="info">
            <span>Year:</span> {movieDetail.Year}
          </p>
          <p className="info">
            <span>Runtime:</span> {movieDetail.Runtime}
          </p>
          <p className="info">
            <span>Genre:</span> {movieDetail.Genre}
          </p>
          <p className="info">
            <span>Director:</span> {movieDetail.Director}
          </p>
          <p className="info">
            <span>Actors:</span> {movieDetail.Actors}
          </p>
          <p className="info">
            <span>IMDb Rating:</span> {movieDetail.imdbRating}
          </p>
          <p className="info">
            <span>Language:</span> {movieDetail.Language}
          </p>
          <p className="info">
            <span>Awards:</span> {movieDetail.Awards}
          </p>
          <p className="info">
            <span>Box Office:</span> {movieDetail.BoxOffice || "N/A"}
          </p>
        </div>
      </div>
    )
  );
};

export default MovieCard;
