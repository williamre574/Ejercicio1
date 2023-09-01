import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Grid from "@mui/material/Unstable_Grid2";
import Types from "./title";
import SelectMovies from "./Picker";
import BasicButtons from "./Buttons";
import { data } from "./Data";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
let selectedPeli = null;
const handleOptionSelect = (selectedId) => {
  selectedPeli = selectedId;
};
export default function AutoGrid() {
  const [cantidadSeleccionada] = useState(1);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const handleButtonAddClick = () => {
    if (selectedPeli !== null) {
      const selectedMovie = data.find((movie) => movie.id === selectedPeli);
      if (
        selectedMovie &&
        !selectedMovies.some((movie) => movie.id === selectedPeli)
      ) {
        setSelectedMovies((prevSelectedMovies) => [
          ...prevSelectedMovies,
          selectedMovie,
        ]);
      }
    }
  };

  const handleDelete = (idToRemove) => {
    setSelectedMovies((prevSelectedMovies) =>
      prevSelectedMovies.filter((movie) => movie.id !== idToRemove)
    );
  };
  const handleQuantityChange = (movieId, newQuantity) => {
    const updatedMovies = selectedMovies.map((movie) =>
      movie.id === movieId
        ? { ...movie, cantidadSeleccionada: newQuantity }
        : movie
    );
    setSelectedMovies(updatedMovies);
  };

  const handleQuantityInputChange = (movieId, newValue) => {
    const newQuantity = parseInt(newValue);
    if (!isNaN(newQuantity)) {
      handleQuantityChange(movieId, newQuantity);
    }
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      sortable: false,
    },
    {
      field: "titulo",
      headerName: "Titulo",
      width: 150,
    },
    {
      field: "precio",
      headerName: "Precio",
      width: 50,
    },
    {
      field: "cantidadSeleccionada",
      headerName: "Selecciona cantidad",
      renderCell: (params) => (
        <input
          type="number"
          id="quantity"
          step="1"
          min="1"
          max="20"
          defaultValue={cantidadSeleccionada}
          onChange={(e) =>
            handleQuantityInputChange(params.row.id, e.target.value)
          }
        ></input>
      ),
      width: 150,
      sortable: false,
    },
    {
      field: "precioTotal",
      headerName: "Precio total",
      valueGetter: (params) => {
        const precio = params.row.precio || 0; // Manejando el caso de que el precio sea nulo
        const cantidadSeleccionada = params.row.cantidadSeleccionada || 1;
        return (precio * cantidadSeleccionada).toFixed(2); // Calculando el precio total
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      width: 110,
      renderCell: (params) => (
        <>
          <DeleteOutlineIcon teIcon onClick={() => handleDelete(params.row.id)}></DeleteOutlineIcon>
        </>
      ),
      sortable: false,
    },
  ];
  const totalPrecioTotal = selectedMovies.reduce(
    (total, movie) =>
      total + (movie.precio || 0) * (movie.cantidadSeleccionada || 1),
    0
  );
  return (
    /*Como maximo hay 12 columnas*/
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid xs={12} md={12}></Grid>
          <Grid xs={12} md={12}></Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid xs={12} md={2}></Grid>
          <Grid xs={12} md={6}>
            <Types texto={"Lista de peliculas"}></Types>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid xs={1} md={2}></Grid>
          <Grid xs={6} md={3}>
            <SelectMovies onDataSelect={handleOptionSelect}></SelectMovies>
          </Grid>
          <Grid xs={3} md={3}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleButtonAddClick}
            >
              Agregar
            </Button>
          </Grid>
          <Grid xs={1} md={2}></Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid xs={1} md={2}></Grid>
          <Grid xs={12} md={8}>
            <DataGrid
              rows={selectedMovies}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Grid>
          <Grid xs={1} md={2}></Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid xs={1} md={4}></Grid>
          <Grid xs={1} md={4}></Grid>
          <Grid xs={1} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Suma total: {totalPrecioTotal.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
