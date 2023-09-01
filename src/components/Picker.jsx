import {useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { data } from './Data';
import PropTypes from 'prop-types';

export default function SelectMovies({onDataSelect}) {

    const [OpcionSeleccionada, setOpcionSeleccionada] = useState('');
    const handleChange = (event) => {
        const selectedId = data.find(pelicula => pelicula.titulo === event.target.value)?.id;
        if (selectedId !== undefined) {
            onDataSelect(selectedId);
        }
        setOpcionSeleccionada(event.target.value);
    }
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-select-small-label">Peliculas</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={OpcionSeleccionada}
                label="Peliculas"
                onChange={handleChange}
            >
                {data.map((pelicula,id) => (
                    <MenuItem key={id} value={pelicula.titulo}>
                        {pelicula.titulo}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    );
}

SelectMovies.propTypes={
    onDataSelect:PropTypes.string,
};