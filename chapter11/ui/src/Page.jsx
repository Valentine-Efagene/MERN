/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Glyphicon,
  Tooltip,
  OverlayTrigger,
  Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';

function NavBar() {
  return (
    // just enter property fixedTop without argument to fix the footer
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Issue Tracker</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to='/issues'>
          <NavItem>Issue List</NavItem>
        </LinkContainer>
        <LinkContainer to='/report'>
          <NavItem>Report</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <NavItem>
          <OverlayTrigger
            placement='left'
            delayShow={1000}
            overlay={<Tooltip id='create-issue'>Create Issue</Tooltip>}
          >
            <Glyphicon glyph='plus' />
          </OverlayTrigger>
        </NavItem>
        <NavDropdown
          id='user-dropdown'
          title={<Glyphicon glyph='option-vertical' />}
          noCaret
        >
          <MenuItem>About</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <p className='text-center'>
        Full source code available at this{' '}
        <a href='https://github.com/Valentine-Efagene/MERN'>
          Github repository
        </a>
      </p>
    </small>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Grid fluid>
        <Contents />
      </Grid>
      <Footer />
    </div>
  );
}
