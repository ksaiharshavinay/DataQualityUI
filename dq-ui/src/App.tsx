import React from 'react';
import logo from './logo.svg';
import './App.css';
import ConfigPage from './pages/ConfigPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <ConfigPage />
        </header>
      </div>
    </ThemeProvider>
  );
}


export default App;
