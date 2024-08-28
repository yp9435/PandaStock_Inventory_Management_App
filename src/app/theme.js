import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create a theme with Poppins font
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    h2: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    h3: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    h4: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    h5: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    h6: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    body1: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    body2: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your application components */}
    </ThemeProvider>
  );
}

export default App;
