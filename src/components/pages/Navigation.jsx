import { NavLink } from 'react-router-dom';

function Navigation(){
    return (

        <nav className = 'navigation'>
                             
                {/*NOTES: 
                    - active: The function in the className will consider when the page is the one the user is and will mark it as active or 'none'
                    - CSS will then style the active page's link differently */}

              
    <nav className="navigation">
      <div className="nav-items">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/events/page/1" className={({ isActive }) => (isActive ? 'active' : '')}>Events</NavLink>
        <NavLink to="/attractions/page/1" className={({ isActive }) => (isActive ? 'active' : '')}>Attractions</NavLink>
        <NavLink to="/venues/page/1" className={({ isActive }) => (isActive ? 'active' : '')}>Venues</NavLink>
      </div>
    </nav>

        </nav>

    )
}

export default Navigation;
