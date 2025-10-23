//CONST
const apikey = 'A6n89CO7sGvKlxkzQ04esP9HKlQabQ12';

//IMPORT STATEMENTS

    //Hooks (useState, useEffect) manage state and side effects
    import React, { useState, useEffect } from 'react';                                    
        
    //Axios for API calls
    import axios from 'axios';                                                              

    /* React Router DOM: routing and navigation tools in React
        - useParams: hook, allows access to dynamic parameters in the URL (such as page)
        - useNavigate: hook, used to navigate to different routes (form submission or error handling); again client-side navigation
    */
    import { useParams, useNavigate, Link } from 'react-router-dom';     

    //MATERIAL UI and CSS
      /* NOTES:
          - Card: Used as a container for content and actions.
          - CardContent: Holds the main content of the Card, like text or images.
          - CardMedia: Displays media such as images within the Card.
          - Typography: For rendering text elements with consistent styling.
          - CardHeader: Displays a title or subtitle at the top of the Card.
      */
          import { Box, Grid, Card, CardContent, CardMedia, Typography, CardHeader } from '@mui/material';
          import noImage from '../img/brioche.jpg';
          import '../app/App.css';



//FORM: HTML AND HANDLING

    // VenueSearch: Function declaration, props: handleSearch function
    function VenueSearch({ handleSearch }) {
      

      // State variable initialization using useState
      // Variable represents what will be collected from the form. Initially set to an empty string ('').
      const [venueSearchTerm, setVenueSearchTerm] = useState('');


      // validateSearchInput: Function declaration, parameters: none
      const validateSearchInput = () => {
          
          // Check Search Term; return false if it fails
          if (!venueSearchTerm || venueSearchTerm.trim().length < 3) {
              alert('The search term must be at least 3 characters long.');
              return false;
          }

          return true; 
      };



      // processSearchSubmission: Function declaration, parameters: event
      // event: Object representing the DOM event, also has methods to manipulate its behavior
      const processSearchSubmission = (event) => {
        

          // preventDefault(): Stops default action of event from being triggered
          // Default form action: submit data and reload the page
          event.preventDefault(); 


          // Validation: call validateSearchInput
          // If it does not return true, then stop the processSearchSubmission function
          if (!validateSearchInput()) {
              return;
          }


          // If validation passes, call the handleSearch function passed as a prop
          handleSearch(venueSearchTerm.trim());

          // Reset the form field to its default empty state after submission
          setVenueSearchTerm('');
          
      };

      return (
          
          // Form declaration in HTML, when it submits it will call processSearchSubmission
          <form onSubmit={processSearchSubmission} className="search-bar">
              
              {/* Search Term */}
              <div>
                  {/* Notes: htmlFor and id match, linking the label and input
                              In React, use 'htmlFor' instead of 'for' because 'for' is a reserved keyword in JavaScript */}
                  <label htmlFor="venueSearchTerm">Search Venues:</label>
                  <input
                      type="text"
                      id="venueSearchTerm"
                      name="attractionSearchTerm"
                      value={venueSearchTerm}
                      // onChange: Updates the venueSearchTerm state with the current value of the input field.
                      onChange={(event) => setVenueSearchTerm(event.target.value)}
                      placeholder="Enter search term..."
                  />
              </div>

              {/* BUTTON */}
              <button type="submit">Search</button>
      
          </form>
      );
    }



//VENUES BROWSE PAGE: Data Fetching, Search, and Pagination

    const VenuesBrowsePage = () => {
      


      //PARAMETER AND NAVIGATION SET UP
      
          //Using the imported useParams, pulls the 'page' parameter from the URL
          const { page } = useParams();  
          //Using imported useNavigate sets up function to navigate to different routes
          const navigate = useNavigate();
       
          

      // STATE MANAGEMENT 

          //Create state variable (venuesData) and the setter function (setVenuesData)
          const [venuesData, setVenuesData] = useState([]);

          //Create state variable (loading) and the setter function (setLoading)
          const [loading, setLoading] = useState(true);

          //Create state variable (totalPages) and the setter function (setTotalPages)
          //We're initially setting the total pages to be one
          const [totalPages, setTotalPages] = useState(1);

          //Create state variable (searchTerm) and the setter function (setSearchTerm)
          const [searchTerm, setSearchTerm] = useState('');



      //DATA FETCHING

          //useEffect: fetchVenues()
          //Notes: In useEffect, the function is first defined and then it is immediately called.
          //Notes (cont): useEffect defines async functions

          useEffect(() => {
              
            async function fetchVenues() {
              
              try {

                //Redirect if pages outside bound
                if (parseInt(page) < 1 || parseInt(page) > totalPages) {
                  navigate('/404'); 
                  return;
                }
                
                //Set loading to true at the start of data fetching
                //Why set true here and not the invidiual pages? Bc we are doing multiple fetches, so it needs to be explicit 
                setLoading(true);
                
                //Use axios to pull form the Ticketmaster API the data for the venues
                const { data } = await axios.get(                  
                  `https://app.ticketmaster.com/discovery/v2/venues.json`,
                  
                  {
                    params: {
                      
                      apikey: apikey,
                      
                      //Why -1 ? The API has zero based indexing for pages                      
                      page: page - 1, 
                      
                      //Pagination limit
                      size: 20, 

                      // ... -- Spread operator; takes the object and spreads it into the other object.
                      // What are we spreading? If the searchTerm is truthy, we then add the keyword property to the params object
                      // AKA we're creating the object { keyword: searchTerm } and spreading it into the paramaters object
                      // As noted another file, the && is logical AND. so if the search term is truth, then we will do this.
                      //If falsy, no object is created.

                      ...(searchTerm && { keyword: searchTerm }) 

                    }
                  }

                );

                //Check if there are venues for the page; if not, redirect to 404
                // What is _embedded?  nested object in API response when the requested data has related or linked entities 
                if (!data._embedded?.venues?.length) {
                  alert('No matching results found. Showing all venues.');
                  setSearchTerm('');
                  navigate('/venues/page/1');
                  return;
                }

                //Set the venues data and pagination info in state
                setVenuesData(data._embedded.venues);
                setTotalPages(data.page.totalPages);
                setLoading(false);

              } catch (e) {
                //Log errors and navigate to the 404 page
                console.error('An error occurred when fetching venues:', e);
                navigate('/404');
              }
            }

            //Immediately call the function just defined
            fetchVenues();

            }, 

            //Dependency Array
            //Notes: the dependency array is the second argument. The first argument is the function that contains the logic
            /* Dependency Array, definitions for this case: 
                  - page: current page of venues; when this changes, the effect is triggered to fetch new data
                  - searchTerm: current search term for venues; triggers new data fetch if updated
                  - navigate: function that helps move the user to different pages, from react-router-dom*/

            [page, searchTerm, navigate]);

            //CLOSED: useEffect()



      //LOADING STATE AND CONDITIONAL RENDERING
      
          //Loading
          //Checked every time the jsx (react render function) is rerendered
          //So, loading is initially set to true, but the fetchVenues() sets it to false once it has pulled the data  
          if (loading) {
            return <h2>Loading...</h2>;
          }

          //If no venues data pulled
          if (!venuesData.length) {
            //Redirect to the 404 not found page (as per lab requirements)
            navigate('/404');
            //Return null to ensure no further rendering
            return null;
          }

      //DISPLAY UPDATE
      //RETURN FOR THE HIGHEST LEVEL FUNCTION: VenuesBrowsePage

      //IMPORTANT: FOR THE BEST NOTES ON MUI RETURNS MAKE SURE TO LOOKS AT ATTRACTIONDETAILPAGE AND ATTRACTIONSBROWSEPAGE


      return (

        <div>

        <VenueSearch
          handleSearch={(term) => {
            setSearchTerm(term);
            navigate('/venues/page/1'); 
          }}
        />

        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            margin: '20px 0', 
            color: 'white', 
            backgroundColor: '#007bff',  
            padding: '10px',             
            borderRadius: '8px'          
          }}
        >
          Browse Venues: Page {page}
        </Typography>

      <Grid container spacing={2} justifyContent="center">
        {venuesData.map((venue) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={venue.id}>
            <Card sx={{ maxWidth: 250, height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  
              <CardMedia
                component="img"
                image={venue.images?.[0]?.url || noImage}
                alt={venue.name || 'Venue Image'}
                sx={{
                  height: 180,
                  objectFit: venue.images?.[0]?.url ? 'contain' : 'cover',
                  backgroundColor: '#ffffff',
                }}
              />

              <CardHeader
                title={venue.name || 'No Venue Name Available'}
                titleTypographyProps={{ variant: 'subtitle1', wrap: 'break-word' }}
                sx={{ textAlign: 'center', padding: '8px' }}
              />

              <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px' }}> 
                <Typography variant="body2">
                  <Link to={`/venues/${venue.id}`}>View Details</Link>
                </Typography>
              </CardContent>

            </Card>

          </Grid>

        ))}
      </Grid>

      <Box sx={{ height: '50px' }} /> 

       {/* PAGINATION
        1. `number`: Current page index from the API 
        2. `size`: Number of items per page (which I set to 20)
        3. `totalElements`: Total number of items in the dataset.
        4. `totalPages`: Total pages available, calculated by the API as `Math.ceil(totalElements / size)`.
        */}
        
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            
            {parseInt(page) > 1 && (
              <button onClick={() => navigate(`/venues/page/${parseInt(page) - 1}`)}>Previous</button>
            )}

            {parseInt(page) < totalPages && (
              <button onClick={() => navigate(`/venues/page/${parseInt(page) + 1}`)}>Next</button>
            )}

          </div>

        </div>
      );

      //CLOSE OF: VenuesBrowsePage
    };

//EXPORT
export default VenuesBrowsePage;
