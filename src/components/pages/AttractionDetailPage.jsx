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
    import { Card, CardContent, CardMedia, Typography, CardHeader } from '@mui/material';
    import noImage from '../img/brioche.jpg';


//ATTRACTION (Individaul): Data Setting and State Management

    const AttractionDetailPage = () => {
      


      //PARAMETER AND NAVIGATION SET UP
      
          //Using the imported useParams, pulls the 'id' parameter from the url
              const { id } = useParams();  
          //Using imported useNavigate sets up function to navigate to a different routes
              const navigate = useNavigate();


          
      // STATE MANAGEMENT 

          //Create state variable (attractionData) and the setter function (setAttractionData)
              const [attractionData, setAttractionData] = useState(undefined);
          //Create state variable (loading) and the setter function (setAttractisetLoadingonData)
             const [loading, setLoading] = useState(true);



      //DATA FETCHING
      
          //useEffect: fetchAttractionData()
          //Notes: In useEffect, the function is first defined and then it is immediately called.
          //Notes (cont): useEffect defines async functions
          
          useEffect(() => {
            
                async function fetchAttractionData() {
                  
                  try {
                    
                    //Use axios to pull form the Ticketmaster API the data for the attaction
                    //Why { data: attraction }? This will destructure the data property and rename it to attraction
                    const { data: attraction } = await axios.get(
                      //Construct the URL and set the ID for the particular attraction
                      `https://app.ticketmaster.com/discovery/v2/attractions/${id}.json`,
                      //Pass in the apikey as a parameter
                      { params: { apikey: apikey } }
                    );
                    
                    //Update 'attraction' state with fetched data
                    setAttractionData(attraction);
                    
                    //After data is fetched, set loading to false
                    setLoading(false);

                  } catch (e) {
                    
                    //Log errors and return the 404 page
                    console.error('An error occured when fetching data for the attraction:', e);
                    navigate('/404'); 
                  }

                }

            //Immmideately call the function just defined
          
              fetchAttractionData();

          }, 

          //Dependency Array
          //Notes: the dependency array is the second argument. The first argument is the function that contains the logic
          /* Dependency Array,  definitions for this case: 
                - id: unique id for the attraction; when this changes, the effect is triggered to fetch new data
                - navigate: function that helps move the user to different pages, from react-router-dom*/

          [id, navigate]);

          //CLOSED: useEffect()



      //LOADING STATE AND CONDITIONAL RENDERING
      
          //Loading
          //Checked every time the jsx (react render function) is rerendered
          //So, loading is initially set to true, but the fetchAttractionData() sets it to false once it has pulled the data  
          if (loading) {
            return <h2>Loading...</h2>;
          }

          //If no attraction data pulled
          if (!attractionData) {
            //Redirect to the 404 not found page (as per lab requirments)
            navigate('/404');
            //return null to ensure no further rendering
            return null;
          }



      //DATA PROCESSING

            //Define constants that are pulled from attractionData
            //attractionData: reminder, this is pulled and set using the useEffect function above
            //The destructuring pulls the data based on the keys provided by the API response
            const {
              name,
              classifications,
              upcomingEvents,
              images,
              description,
              _embedded: { venues } = {},
            } = attractionData;

            const venue = venues?.[0]; 

            let genre = 'N/A';
            let subGenre = 'N/A';
            
            //NEW: REMEMBER THIS APPROACH; Old version below is such an eye sore
            //?. -- chaining operator. This automatically handles if the value is null or undefined. 
            //If they are, the chaining operator will return 'undefined'; if it is defined, it will flow into the if statement
            
            if (classifications?.length > 0) {
              const firstClassification = classifications[0];
            
              if (firstClassification?.genre) {
                genre = firstClassification.genre.name;
              }
            
              if (firstClassification?.subGenre) {
                subGenre = firstClassification.subGenre.name;
              }
            }

                /* OLD VERSION: Keeping for reference/learning's sake

                  //Helper to check the value is not undefined or null
                  function isDefined(value) {
                    return value !== undefined && value !== null;
                  }

                  // Confirm the api returned data with classifications and it holds values
                  // For ticketmaster, classifications will be an array with objects. 
                  
                  if (isDefined(classifications) && classifications.length > 0) {
                    
                    const firstClassification = classifications[0];
                  
                    if (isDefined(firstClassification?.genre)) {
                      genre = firstClassification.genre.name;
                    }
                  
                    if (isDefined(firstClassification?.subGenre)) {
                      subGenre = firstClassification.subGenre.name;
                    }
                  }
                    */
              
      

      //DISPLAY UPDATE
      //RETURN FOR THE HIGHEST LEVEL FUNCTION: AttractionDetailPage

        /* STYLING DEFINITIONS:
        - variant: Specifies the typography style and size (e.g., body2 for smaller text).
        - sx: Inline styling object for customizing Material-UI components.
        - mb (margin-bottom): Adds vertical spacing below the element.
        - wordBreak: Controls text wrapping behavior to prevent overflow.
        - textAlign: Aligns text horizontally within its container.
        - mt (margin-top): Adds vertical spacing above the element.
        - maxHeight: Restricts the maximum height of an element.
        - objectFit: Defines how content (e.g., images) should resize to fit its container.
        */

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
            
            <Typography variant="body2" sx={{ mb: 1, wordBreak: 'break-word' }}>
              <strong>Description:</strong> {description || 'No Description Available'}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Upcoming Events:</strong> {upcomingEvents?.total || 'N/A'}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Venue:</strong> {venue?.name || 'N/A'}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Location:</strong> {venue ? `${venue.city?.name}, ${venue.state?.name}, ${venue.country?.name}` : 'N/A'}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Genre:</strong> {genre || 'N/A'}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Subgenre:</strong> {subGenre || 'N/A'}
            </Typography>

            <Typography variant="body2" sx={{ textAlign: 'center', mt: 3 }}>
              <Link to="/attractions/page/1">Back to Attractions</Link>
            </Typography>
            
          </CardContent>

        </Card>
      );
    };
    
    export default AttractionDetailPage;