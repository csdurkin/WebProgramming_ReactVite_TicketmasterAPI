//CONST
const apikey = 'A6n89CO7sGvKlxkzQ04esP9HKlQabQ12';

//IMPORT STATEMENTS
  
    //Hooks (useState, useEffect) manage state and side effects
    import React, { useState, useEffect } from 'react';                                    
    
    //Axios for API calls
    import axios from 'axios';                                                              
    
    /* React Router DOM: routing and navigation tools in React
        - Link: navigation between different routes without reloading page (client-side routing)
        - useParams: hook, allows access to dynamic parameters in the URL (such as id)
        - useNavigation: hook, used to navigate to differnt routes (form submission or error handling); again client-side navigation
    */
    import { Link, useParams, useNavigate } from 'react-router-dom';   

    //MATERIAL UI
    /* NOTES:
        - Card: Used as a container for content and actions.
        - CardContent: Holds the main content of the Card, like text or images.
        - CardMedia: Displays media such as images within the Card.
        - Typography: For rendering text elements with consistent styling.
        - CardHeader: Displays a title or subtitle at the top of the Card.
    */
        import noImage from '../img/brioche.jpg';
    import { Card, CardContent, CardMedia, Typography, CardHeader } from '@mui/material';

//Venue (Individaul): Data Setting and State Management

    const VenueDetailPage = () => {
      


        //PARAMETER AND NAVIGATION SET UP
        
            //Using the imported useParams, pulls the 'id' parameter from the url
            const { id } = useParams();  
            //Using imported useNavigate sets up function to navigate to a different routes
            const navigate = useNavigate();



        // STATE MANAGEMENT 

          //Create state variable (venueData) and the setter function (setVenueData)
            const [venueData, setVenueData] = useState(undefined);
            const [loading, setLoading] = useState(true);



        //DATA FETCHING
              
          //useEffect: fetchAttractionData()
          //Notes: In useEffect, the function is first defined and then it is immediately called.
          //Notes (cont): useEffect defines async functions

              useEffect(() => {
                
                async function fetchVenueData() {
                  
                   
                    try {

                      //Use axios to pull form the Ticketmaster API the data for the venue
                      //Why { data: venue }? This will destructure the data property and rename it to attraction
                      const { data: venue } = await axios.get(
                        //Construct the URL and set the ID for the particular attraction
                        `https://app.ticketmaster.com/discovery/v2/venues/${id}.json`,
                        //Pass in the apikey as a parameter
                        { params: { apikey: apikey } }
                      );

                      //Update 'attraction' state with fetched data
                      setVenueData(venue);

                      //After data is fetched, set loading to false
                      setLoading(false);

                    } catch (e) {
                      //Log errors and return the 404 page
                      console.error('Error fetching venue data:', e);
                      navigate('/404'); // Redirect if venue not found
                    }

                }

                //Immmideately call the function just defined

                fetchVenueData();

              //Dependency Array
                  //Notes: the dependency array is the second argument. The first argument is the function that contains the logic
                  /* Dependency Array,  definitions for this case: 
                        - id: unique id for the venue; when this changes, the effect is triggered to fetch new data
                        - navigate: function that helps move the user to different pages, from react-router-dom*/
              }, [id, navigate]);

              //CLOSED: useEffect()



      //LOADING STATE AND CONDITIONAL RENDERING
      
          //Loading
          //Checked every time the jsx (react render function) is rerendered
          //So, loading is initially set to true, but the fetchAttractionData() sets it to false once it has pulled the data  
              if (loading) {
                return <h2>Loading...</h2>;
              }
 
          //If no attraction data pulled
              if (!venueData) {
                return <h2>No venue data available</h2>;
              }



      //DATA PROCESSING

        //Define constants that are pulled from attractionData
        //attractionData: reminder, this is pulled and set using the useEffect function above
        //The destructuring pulls the data based on the keys provided by the API response

          const {
            name,
            address,
            city,
            state,
            postalCode,
            country,
            url,
            images
          } = venueData;
 


      //DISPLAY UPDATE
      //RETURN FOR THE HIGHEST LEVEL FUNCTION: venueDetailPage
      
      //IMPORTANT: FOR THE BEST NOTES ON MUI RETURNS MAKE SURE TO LOOKS AT ATTRACTIONDETAILPAGE AND ATTRACTIONSBROWSEPAGE

      return (

        <Card sx={{ width: 900, margin: 'auto', mt: 2 }}>

          <CardHeader title={name || 'Venue Name Unavailable'} />


          <CardMedia
            component="img"
            image={images?.[0]?.url || noImage}
            alt={`${name} image`}
            sx={{ maxHeight: 500, objectFit: 'cover' }}
          />


          <CardContent>

            <Typography variant="body2">
              <strong>Address:</strong> {address?.line1 || 'N/A'}, {city?.name || 'N/A'}, {state?.name || 'N/A'}, {postalCode || 'N/A'}
            </Typography>

            <Typography variant="body2">
              <strong>Country:</strong> {country?.name || 'N/A'}
            </Typography>

            {/* noopener stops the new tab from messing with the original, noreferrer hides page's address */}  
            <Typography variant="body2">
              <strong>More Information:</strong>{' '}
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Visit Venue Site
                </a>
              ) : (
                'N/A'
              )}
            </Typography>

            <Link to="/venues/page/1">Back to Venues</Link>

          </CardContent>


        </Card>

      );

    };

export default VenueDetailPage;
