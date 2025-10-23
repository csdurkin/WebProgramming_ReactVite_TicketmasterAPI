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
        import { Box,Grid, Card, CardContent, CardMedia, Typography, CardHeader } from '@mui/material';
        import noImage from '../img/brioche.jpg';
        import '../app/App.css';



//FORM: HTML AND HANDLING

    // AttractionSearch: Function declaration, props: handleSearch function
    function AttractionSearch({ handleSearch }) {
      

      // State variable initialization using useState
      // Variable represents what will be collected from the form. Initially set to an empty string ('').
      const [attractionSearchTerm, setAttractionSearchTerm] = useState('');


      // validateSearchInput: Function declaration, parameters: none
      const validateSearchInput = () => {
          
          // Check Search Term; return false if it fails
          if (!attractionSearchTerm || attractionSearchTerm.trim().length < 3) {
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
          handleSearch(attractionSearchTerm.trim());

          // Reset the form field to its default empty state after submission
          setAttractionSearchTerm('');
          
      };

      return (
          
          // Form declaration in HTML, when it submits it will call processSearchSubmission
          <form onSubmit={processSearchSubmission} className="search-bar">
              
              {/* Search Term */}
              <div>
                  {/* Notes: htmlFor and id match, linking the label and input
                              In React, use 'htmlFor' instead of 'for' because 'for' is a reserved keyword in JavaScript */}
                  <label htmlFor="attractionSearchTerm">Search Attractions:</label>
                  <input
                      type="text"
                      id="attractionSearchTerm"
                      value={attractionSearchTerm}
                      name="attractionSearchTerm"
                      // onChange: Updates the attractionSearchTerm state with the current value of the input field.
                      onChange={(event) => setAttractionSearchTerm(event.target.value)}
                      placeholder="Enter search term..."
                  />
              </div>

              {/* BUTTON */}
              <button type="submit">Search</button>
      
          </form>
      );
    }



//ATTRACTIONS BROWSE PAGE: Data Fetching, Search, and Pagination

    const AttractionsBrowsePage = () => {
      

      //PARAMETER AND NAVIGATION SET UP
      
          //Using the imported useParams, pulls the 'page' parameter from the URL
          const { page } = useParams();  
          //Using imported useNavigate sets up function to navigate to different routes
          const navigate = useNavigate();
       
          

      // STATE MANAGEMENT 

          //Create state variable (attractionsData) and the setter function (setAttractionsData)
          const [attractionsData, setAttractionsData] = useState([]);

          //Create state variable (loading) and the setter function (setLoading)
          const [loading, setLoading] = useState(true);

          //Create state variable (totalPages) and the setter function (setTotalPages)
          //We're initially setting the total pages to be one
          const [totalPages, setTotalPages] = useState(1);

          //Create state variable (searchTerm) and the setter function (setSearchTerm)
          const [searchTerm, setSearchTerm] = useState('');



      //DATA FETCHING

          //useEffect: fetchAttractions()
          //Notes: In useEffect, the function is first defined and then it is immediately called.
          //Notes (cont): useEffect defines async functions

          useEffect(() => {
              
            async function fetchAttractions() {
              
              try {

                //Redirect if pages outside bound
                if (parseInt(page) < 1 || parseInt(page) > totalPages) {
                  navigate('/404'); 
                  return;
                }
                
                //Set loading to true at the start of data fetching
                //Why set true here and not the invidiual pages? Bc we are doing multiple fetches, so it needs to be explicit 
                setLoading(true);
                
                //Use axios to pull form the Ticketmaster API the data for the attactions
                const { data } = await axios.get(                  
                  `https://app.ticketmaster.com/discovery/v2/attractions.json`,
                  
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

               // Check if there are attractions for the page; if not, reset search
                if (!data._embedded?.attractions?.length) {
                  alert('No matching results found. Showing all attractions.');
                  
                  // Reset search term to fetch all attractions
                  setSearchTerm('');
                  
                  // Refetch all attractions without a search term
                  navigate('/attractions/page/1'); 
                  return; 
                }

                //Set the attractions data and pagination info in state
                setAttractionsData(data._embedded.attractions);
                setTotalPages(data.page.totalPages);
                setLoading(false);

              } catch (e) {
                //Log errors and navigate to the 404 page
                console.error('An error occurred when fetching attractions:', e);
                navigate('/404');
              }
            }

            //Immediately call the function just defined
            fetchAttractions();

            }, 

            //Dependency Array
            //Notes: the dependency array is the second argument. The first argument is the function that contains the logic
            /* Dependency Array, definitions for this case: 
                  - page: current page of attractions; when this changes, the effect is triggered to fetch new data
                  - searchTerm: current search term for attractions; triggers new data fetch if updated
                  - navigate: function that helps move the user to different pages, from react-router-dom*/

            [page, searchTerm, navigate]);

            //CLOSED: useEffect()



      //LOADING STATE AND CONDITIONAL RENDERING
      
          //Loading
          //Checked every time the jsx (react render function) is rerendered
          //So, loading is initially set to true, but the fetchAttractions() sets it to false once it has pulled the data  
          if (loading) {
            return <h2>Loading...</h2>;
          }

          //If no attractions data pulled
          if (!attractionsData.length) {
            //Redirect to the 404 not found page (as per lab requirements)
            navigate('/404');
            //Return null to ensure no further rendering
            return null;
          }



      //DISPLAY UPDATE
      //RETURN FOR THE HIGHEST LEVEL FUNCTION: AttractionsBrowsePage

      return (
        
        <div>

        {/* SEARCH BAR: 
            - Displays the search bar for user input
            - Updates the search term using 'handleSearch'
            - Redirects to the first page of search results on submission */}
        <AttractionSearch
          handleSearch={(term) => {
            setSearchTerm(term);
            navigate('/attractions/page/1'); 
          }}
        />  

        {/* PAGE TITLE: 
            - Displays the page title with centered text
            - Uses the 'h4' variant for size and weight
            - Includes a blue background with white text */}
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
          Browse Attractions: Page {page}
        </Typography>


      {/* GRID CONTAINER 
          - Defines a grid container with 2 spacing and centered content
          - The spacing is saying how many units (here 2) to put between each item. Unit depends on display/theme.
          - Center: this is going to center the grid items in the container, within the available space*/}

      <Grid container spacing={2} justifyContent="center">
        
        {/*Map the attractions to grid items*/}
        {attractionsData.map((attraction) => (
          
         /* GRID ITEM: 
            - XS, SM, MD, LG: This is saying how many columns the grid item should take up on respectively sized screens
            - key={attraction.id}: creates a unique identifer for this grid item. NEEDS to have a unique identifier
         */
         <Grid item xs={12} sm={6} md={4} lg={3} key={attraction.id}>

            {/* CARD: 
                - maximum width, height: gives the dimensions of the individual card
                - display: enables flexbox layout. what does this mean? allows for flexible item arrangements
                - flexdirection: arranges content vertically, arranges things neatly wihtin the container
                - justifyContent: spaces content vertically, arranges things neatly wihtin the container
            */}
            <Card sx={{ maxWidth: 250, height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              {/* CARD MEDIA: 
                 - height: Sets the height of the image within the card.
                 - objectFit: 'cover' ensures the image fills the available space while maintaining aspect ratio. 
                 - In case no image is available, a fallback 'noImage' is used and defined above (It's my dog Brioche <3 )
                 - Sets alt text to be the attractions name automatically
                 - sx provides the styling component
               */}
               <CardMedia
                 component="img"
                 image={attraction.images?.[0]?.url || noImage}
                 alt={attraction.name || 'Attraction Image'}
                 sx={{ height: 180, objectFit: 'cover' }}
               />
               
               {/* CARD HEADER: 
                 - Displays the attraction name or a fallback if unavailable.
                 - Uses 'subtitle1' variant for smaller title size.
                 - Allows text wrapping with 'wrap: 'break-word''.
                 - 'padding: '8px'' for tighter spacing.
               */}
               <CardHeader
                 title={attraction.name || 'No Attraction Name Available'}
                 titleTypographyProps={{ variant: 'subtitle1', wrap: 'break-word' }}
                 sx={{ padding: '8px', textAlign: 'center' }}
               />
 
               {/* CARD CONTENT: 
                 - 'flex' and 'justifyContent: 'center': Arranges content horizontally in the center
                 - 'alignItems: 'center': Vertically aligns content in the center  
                 - 'padding: '8px': spacing within the content area.
                 - Displays a link to the attraction details page with the text "View Details".
               */}
               <CardContent sx={{ padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <Typography variant="body2">
                   <Link to={`/attractions/${attraction.id}`}>View Details</Link>
                 </Typography>
               </CardContent>
 
             </Card>

          </Grid>
        ))}

      </Grid>
      
      {/* SPACER*/}
      <Box sx={{ height: '50px' }} /> 
      

      {/* PAGINATION
        1. `number`: Current page index from the API 
        2. `size`: Number of items per page (which I set to 20)
        3. `totalElements`: Total number of items in the dataset.
        4. `totalPages`: Total pages available, calculated by the API as `Math.ceil(totalElements / size)`.
        */}
        
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>

            {parseInt(page) > 1 && (
             <button onClick={() => navigate(`/attractions/page/${parseInt(page) - 1}`)}>
                Previous
              </button>
            )}

            {parseInt(page) < totalPages && (
             <button onClick={() => navigate(`/attractions/page/${parseInt(page) + 1}`)}>Next</button>
            )}

          </div>

        </div>

      );

      //CLOSE OF: AttractionsBrowsePage
    };

//EXPORT
export default AttractionsBrowsePage;
