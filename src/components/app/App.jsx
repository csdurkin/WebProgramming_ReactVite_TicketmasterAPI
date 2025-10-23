// IMPORTS FOR REACT AND ROUTING
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { AppBar, Toolbar, Typography, ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../muiStyling/theme.js';
import './App.css';     //Only necessary in app.jsx? TBD! Thought is bc it will apply throughout the application without rendunant imports

// IMPORT OF PAGES 
import Navigation from '../pages/Navigation';
import Home from '../pages/HomePage';
import EventList from '../pages/EventsBrowsePage';
import EventDetailPage from '../pages/EventDetailPage';
import AttractionList from '../pages/AttractionsBrowsePage';
import AttractionDetailPage from '../pages/AttractionDetailPage';
import VenueList from '../pages/VenuesBrowsePage';
import VenueDetailPage from '../pages/VenueDetailPage';
import NotFound from '../pages/NotFoundPage';

const App = () => {

  return (
    
    <ThemeProvider theme={theme}>
      
      <CssBaseline />

        <div className="App">

        {/* 
          - AppBar: Top navigation container.
          - Toolbar: Aligns and spaces items.
          - Typography: Displays 'Ticketbrowser' as a heading.
          - flexgrow - fills available space
        */}

        <AppBar position="static">

          <Toolbar>

            <Typography variant="h1" sx={{ flexGrow: 1, textAlign: 'left' }}>
              Ticketbrowser
            </Typography>

            <Navigation />

          </Toolbar>

        </AppBar>
        
          {/*NOTES:
              - These routes will allow for the navigation between the different URLS
              - React Router listens for changes in the URL and conditionally renders the component that corresponds to the current path.
              - From lecture: these are !FAKE ROUTES! One page. It will not trigger the page reload.
              - It's loading the element that we imported above and defined elsewhere. 
              - These routes below will not make a navigation bar appear on the page.
          */}

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events/page/:page" element={<EventList />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/attractions/page/:page" element={<AttractionList />} />
              <Route path="/attractions/:id" element={<AttractionDetailPage />} />
              <Route path="/venues/page/:page" element={<VenueList />} />
              <Route path="/venues/:id" element={<VenueDetailPage />} />
              <Route path="*" element={<NotFound />} />
          </Routes>

          <main>
            
          </main>

        </div>

    </ThemeProvider>

  );
};

export default App;
