import React from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import {
  setYear,
  setSearchQuery,
  setFilterType,
} from "../redux/moviesSlice.ts";

type Props = {};

const SearchBar = (props: Props) => {
  const dispatch = useDispatch();

  const { searchQuery, year, filterType } = useSelector(
    (state: RootState) => state.movies
  );

  return (
    <Box>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        style={{ marginBottom: "10px", padding: "8px", width: "200px" }}
      />
      <input
        type="number"
        placeholder="Search year..."
        value={year}
        onChange={(e) => dispatch(setYear(e.target.value))}
        style={{ marginBottom: "10px", padding: "8px", width: "200px" }}
      />
      <select
        value={filterType}
        onChange={(e) => dispatch(setFilterType(e.target.value))}
        style={{ marginBottom: "10px", padding: "8px" }}
      >
        <option value="">All</option>
        <option value="movie">Movies</option>
        <option value="series">TV Series</option>
        <option value="episode">Episodes</option>
      </select>
    </Box>
  );
};

export default SearchBar;
