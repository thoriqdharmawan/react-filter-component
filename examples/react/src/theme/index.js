import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  font: 'muli',
  borderColor: 'rgb(204, 204, 204)',
  palette: {
    primary: {
      main: '#055469',
    },
    secondary: {
      main: '#039be5',
    },
    danger: {
      main: '#ef4d5e',
    },
  },
  typography: {
    fontFamily: ['muli'],
    button: {
      textTransform: 'capitalize',
    },
    h6: {
      fontWeight: 700,
    },
  },
})
