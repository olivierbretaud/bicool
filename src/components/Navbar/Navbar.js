import React, {Component} from 'react';
import './Navbar.css';

import Information from '../Information/Information';
import Contact from '../Contact/Contact';

import { Navbar,NavbarBrand,Nav,NavItem,NavLink } from 'reactstrap';

class Navbars extends Component {
  render() {
    return (
      <Navbar color="light" expand="md">
        <NavbarBrand> 
          <img className="logo-Bicool" src={process.env.PUBLIC_URL+'/assets/images/Bicool-logo.png'} alt="Logo BiCool" />
        </NavbarBrand>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink><Information/></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Contact /></NavLink>
            </NavItem>
          </Nav>
      </Navbar>
    )
  }
}

export default Navbars;