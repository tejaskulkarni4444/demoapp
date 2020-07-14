import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#fff',
        main: 'rgb(23, 105, 170)',
        dark: '#000'
     },
     secondary: {
       main: '#f44336',
     },
      title:{ 
        fontWeight: '600',
        fontSize: '14px',
      }
  },
  typography: { 
     useNextVariants: true
  },
  container:{
    padding: '20px'
  }
});


ReactDOM.render(
  <MuiThemeProvider theme = { theme }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </MuiThemeProvider>, 
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
