import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function Types({texto}) {
  return (
    <Box sx={{ width: '100%', maxWidth: 1920 }}>
      <Typography variant="h2" gutterBottom>
        <bold>
        {texto}
        </bold>
      </Typography>
      
    </Box>
  );
}

Types.propTypes = {
    texto: PropTypes.string.isRequired,
  };
