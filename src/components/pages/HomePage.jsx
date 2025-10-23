//IMPORT STATEMENTS

import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button, Stack } from '@mui/material';

//HOMEPAGE COMPONENT

//IMPORTANT FOR THE BEST NOTES ON MUI RETURNS MAKE SURE TO LOOKS AT ATTRACTIONDETAILPAGE AND ATTRACTIONSBROWSEPAGE


const HomePage = () => {
  return (
    
    //This is adding a box behind the elments of this page specifically. easier than updaing theme 
    <Box 
      sx={{ 
        textAlign: 'center', 
        p: 4, 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px', 
        maxWidth: 800, 
        margin: 'auto', 
        mt: 4 
      }}
    >

      {/* PAGE TITLE:
            - 'variant': Specifies the Typography style ('h4' for heading level 4)
            - 'sx': Allows for inline styling using Material-UI's system
            - 'mb': Sets the bottom margin; uses Material-UI's spacing scale (mb: 2 equals 16px)
        */}
      <Typography variant="h4" sx={{ mb: 2, color: '#007bff' }}>
        Discover What to Do in the U.S.A!
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        This app brings you informraiton about events, attractions, and venues as provided by Ticketmaster's API.
        We’re exclusively showing events from the complicated and stressful land known as the <strong>United States of America</strong>.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        The best way to start exploring the country is by using the links below:
      </Typography>

      {/* BUTTON STACK:
            - 'Stack': A flexbox layout container for spacing and alignment
            - 'direction': Defines the layout direction ('row' for horizontal layout)
            - 'spacing': Sets the gap between the buttons using the spacing scale 
            - 'justifyContent': Aligns the children (here the buttons) along the main axis, here center
        */}
      <Stack direction="row" spacing={2} justifyContent="center">
        
        
         {/* BUTTON:
            - 'variant': Defines the button style ('contained' for a filled button)
            - 'color': Uses the theme's color palette for the button 
            - 'component': Renders the Button as a specific component ('Link' from react-router-dom)
            - 'to': Specifies the URL for navigation
        */}
        <Button 
          variant="contained" 
          color="secondary" 
          component={Link} 
          to="/events/page/1"
        >
          Browse Events
        </Button>

        <Button 
          variant="contained" 
          color="secondary" 
          component={Link} 
          to="/attractions/page/1"
        >
          Browse Attractions
        </Button>

        <Button 
          variant="contained" 
          color="secondary" 
          component={Link} 
          to="/venues/page/1"
        >
          Browse Venues
        </Button>
      </Stack>
    </Box>
  );
};

//EXPORT
export default HomePage;
