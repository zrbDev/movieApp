import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setPaginationModel } from "../redux/moviesSlice.ts";
import "../styles/MovieGrid.scss";

interface MovieProps {
  rows: [];
  columns: [];
  totalResults: number;
}

const MovieGrid: React.FC<MovieProps> = ({ rows, columns }) => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch();
  const { totalResults, paginationModel } = useSelector(
    (state: RootState) => state.movies
  );

  const handleRowClick = (row) => {
    navigate(`/movie-detail/${row?.id}`);
  };

  const handlePaginationChange = (model: GridPaginationModel) => {
    dispatch(setPaginationModel(model));
  };

  return (
    <Box className="data-grid-wrapper">
      <DataGrid
        rows={rows}
        columns={columns}
        rowCount={totalResults}
        onRowClick={handleRowClick}
        pageSizeOptions={[10]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={handlePaginationChange}
        sx={{
          "& .MuiDataGrid-cell": {
            fontSize: "14px",
            fontFamily: "Arial",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
};

export default MovieGrid;
