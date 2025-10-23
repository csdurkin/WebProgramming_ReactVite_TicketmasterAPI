//CONST
const apikey = 'A6n89CO7sGvKlxkzQ04esP9HKlQabQ12';


//IMPORT STATEMENTS

    // Hooks (useState, useEffect) manage state and side effects
    import React, { useState, useEffect } from 'react';

    // Axios for API calls
    import axios from 'axios';

    /* React Router DOM: routing and navigation tools in React
      - Link: navigation between different routes without reloading the page (client-side routing)
      - useParams: hook to access dynamic parameters in the URL (e.g., id)
      - useNavigate: hook to navigate programmatically to different routes (e.g., for error handling or redirection) */
    import { Link, useParams, useNavigate } from 'react-router-dom';

    import noImage from '../img/brioche.jpg';
    import { Card, CardContent, CardMedia, Typography, CardHeader } from '@mui/material';



//EVENT (Individual): Data Setting and State Management

    const EventDetailPage = () => {
  
      //PARAMETER AND NAVIGATION SET UP
  
          // Extract 'id' parameter from the URL using useParams
          const { id } = useParams();
          // Initialize navigate function to programmatically navigate between routes
          const navigate = useNavigate();



      // STATE MANAGEMENT 

          // State variable to store fetched event data and its setter function
          const [eventData, setEventData] = useState(undefined);
          // State variable to track loading status and its setter function
          const [loading, setLoading] = useState(true);



      // HELPER FUNCTIONS

          // Helper function to format date from YYYY-MM-DD to MM/DD/YYYY
          const formatDate = (date) => {
            if (!date) return 'N/A';
            const [year, month, day] = date.split('-');
            return `${month}/${day}/${year}`;
          };

          // Helper function to format time in 12-hour format
          const formatTime = (time) => {
            if (!time) return 'N/A';
            const [hour, minute] = time.split(':');
            const hourInt = parseInt(hour, 10);
            const period = hourInt >= 12 ? 'PM' : 'AM';
            const formattedHour = hourInt % 12 || 12;
            return `${formattedHour}:${minute} ${period}`;
          };



      // DATA FETCHING 

          // useEffect to fetch event data from the Ticketmaster API when'id' changes
          useEffect(() => {
           
            async function fetchEventData() {
             
              try {
                
                //Use axios to pull form the Ticketmaster API the data for the attaction
                //Why { data: event }? This will destructure the data property and rename it to event
                const { data: event } = await axios.get(
                  `https://app.ticketmaster.com/discovery/v2/events/${id}.json`,
                  { params: { apikey: apikey } }
                );

                // Update the state with the fetched data
                setEventData(event);

                // Set loading to false as data is fetched
                setLoading(false);

              } catch (e) {
                    //Log errors and return the 404 page
                console.error('Error fetching event data:', e);
                navigate('/404');
              }
            }

            // Immediately call the fetch function
            fetchEventData();

          // Dependency array ensures the effect runs when 'id' or 'navigate' changes
          }, [id, navigate]); 

          //CLOSED: useEffect()



      //LOADING STATE AND CONDITIONAL RENDERING

          //Loading
          //Checked every time the jsx (react render function) is rerendered
          //So, loading is initially set to true, but the fetchAttractionData() sets it to false once it has pulled the data 
          if (loading) {
            return <h2>Loading...</h2>;
          }

           //If no event data pulled
          if (!eventData) {
            navigate('/404');
            return null; // Prevent further rendering
          }



      //DATA PROCESSING
          
        //Define constants that are pulled from eventData
        //eventData: reminder, this is pulled and set using the useEffect function above
        //The destructuring pulls the data based on the keys provided by the API response
          const {
            name,
            dates,
            priceRanges,
            _embedded: { venues } = {},
            classifications,
            images,
            url
          } = eventData;

          //NEW: CHAINING OPERATOR -  REMEMBER THIS APPROACH; 
          //?. -- chaining operator. This automatically handles if the value is null or undefined. 
          //If they are, the chaining operator will return 'undefined'; if it is defined, it will flow into the if statement
          //Old version can be seen on attractionDetailPage for reference 

            let genre = 'N/A'; 
            let subGenre = 'N/A';

            if (classifications?.length > 0) {
              const firstClassification = classifications[0];
            
              if (firstClassification?.genre) {
                genre = firstClassification.genre.name;
              }
            
              if (firstClassification?.subGenre) {
                subGenre = firstClassification.subGenre.name;
              }
            }

          // NEW: LOGICAL AND OPERATOR - REMEMBER THIS APPROACH
          // && -- logical AND operator. This is a quick way to check if something exists (not null or undefined) before trying to access its properties or elements.
          // If the first part (venues) is falsy, the whole thing stops and returns that value.
          // If it’s truthy, then it moves on and takes the first element (venues[0])
          // Old version below. = EYE SORE
          const venue = venues && venues[0];

                /*OLD VERSION
                let venue;
                if (venues) {
                  venue = venues[0];
                } else {
                  venue = undefined;  
                }*/



      //DISPLAY UPDATE
      //RETURN FOR THE HIGHEST LEVEL FUNCTION: eventDetailPage

      //IMPORTANT FOR THE BEST NOTES ON MUI RETURNS MAKE SURE TO LOOKS AT ATTRACTIONDETAILPAGE AND ATTRACTIONSBROWSEPAGE

      return (


        <Card sx={{ width: 900, margin: 'auto', mt: 2 }}>


          <CardHeader title={name || 'No Event Name Available'} />


          <CardMedia
            component="img"
            image={images?.[0]?.url || noImage}
            alt={`${name} image`}
            sx={{ maxHeight: 500, objectFit: 'cover' }}

          />


          <CardContent>

            <Typography variant="body2">
              <strong>Date:</strong> {dates?.start?.localDate ? formatDate(dates.start.localDate) : 'N/A'}
            </Typography>

            <Typography variant="body2">
              <strong>Time:</strong> {dates?.start?.localTime ? formatTime(dates.start.localTime) : 'N/A'}
            </Typography>

            <Typography variant="body2">
              <strong>Venue:</strong> {venue?.name || 'N/A'}
            </Typography>

            <Typography variant="body2">
              <strong>Location:</strong> {venue ? `${venue.city?.name}, ${venue.state?.name}, ${venue.country?.name}` : 'N/A'}
            </Typography>

            <Typography variant="body2">
              <strong>Price Range:</strong> {priceRanges ? `$${priceRanges[0].min} - $${priceRanges[0].max}` : 'N/A'}
            </Typography>

            <Typography variant="body2">
              <strong>Genre:</strong> {genre || 'N/A'}
            </Typography>

            <Typography variant="body2">
              <strong>Subgenre:</strong> {subGenre || 'N/A'}
            </Typography>

          {/* noopener stops the new tab from messing with the original, noreferrer hides page's address */}  
            <Typography variant="body2">
              <strong>More Information:</strong>{' '}
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Visit Event Site
                </a>
              ) : (
                'N/A'
              )}
            </Typography>

            <Link to="/events/page/1">Back to Events</Link>

          </CardContent>

          
        </Card>
      );
};


//EXPORT
export default EventDetailPage;
