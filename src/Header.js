import React from 'react' 
import { Link } from 'react-router-dom'

const Header = () => (
    <header> 
        <nav>
            <ul>
                <li><Link to='/' class="homeNavigationBreadCrumb">Home</Link></li>
                
            </ul> 
        </nav> 
    </header>
)

export default Header