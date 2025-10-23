// Theme configuration for the application

import { createTheme } from '@mui/material/styles';

/* Palette: Defines color scheme for the application */
const theme = createTheme({
  palette: {
    primary: { main: '#007bff' }, 
    secondary: { main: '#EC8305' }, 
    background: { default: '#87CEEB', paper: '#ffffff' }, 
    text: { primary: '#333', secondary: '#666' }, 
  },

  /* Typography: Manages font styles and sizes */
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
    fontSize: 16, 
    fontWeightLight: 300, 
    fontWeightRegular: 400, 
    fontWeightMedium: 500, 
    fontWeightBold: 700, 
    h1: { fontSize: '2.5rem', fontWeight: 800, textAlign: 'center' },
    h2: { fontSize: '2rem', fontWeight: 800, textAlign: 'center' },
    h3: { fontSize: '1.75rem', fontWeight: 700, textAlign: 'center' },
    h4: { fontSize: '1.5rem', fontWeight: 700, textAlign: 'center' },
    h5: { fontSize: '1.25rem', fontWeight: 600, textAlign: 'center' },
    h6: { fontSize: '1rem', fontWeight: 600, textAlign: 'center' },
    subtitle1: { fontSize: '1rem', fontWeight: 500 },
    subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { fontSize: '0.875rem', fontWeight: 700 },
  },

  /* Components: Customizes specific Material-UI components */
  components: {

    /* Button: Custom styles for buttons */
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
        },
      },
    },

    /* Card: Custom styles for card components */
    MuiCard: {
      styleOverrides: {
        root: {
          maxWidth: '100%',
          margin: '16px 0',
          padding: '16px',
          borderRadius: 12,
          border: '2px solid #EC8305',
        },
      },
    },

    /* CardMedia: Styling for media within cards */
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 'auto',
          objectFit: 'cover',
          border: '2px solid #EC8305',
        },
      },
    },

    /* Typography: Applies consistent line height */
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: 1.5,
        },
      },
    },

    /* Paper: Custom styles for paper elements */
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: 10,
        },
      },
    },

    /* Link: Styling for link elements */
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: '#007bff',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});

export default theme;

/* DEFINITIONS:
- palette: Defines color themes, including primary, secondary, background, and text colors.
- typography: Sets global font styles, sizes, and weights.
- maxWidth: Specifies the maximum width an element can take.
- margin: Adds space around elements.
- padding: Adds space inside an element.
- border: Defines the style, width, and color of borders.
- borderRadius: Rounds the corners of an element.
- textTransform: Controls capitalization of text.
- objectFit: Specifies how media should fit its container.
- textDecoration: Sets or removes text decoration like underlines.
*/
