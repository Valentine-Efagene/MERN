/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Glyphicon,
  Grid,
  Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import Search from './Search.jsx';
import SignInNavItem from './SignInNavItem.jsx';

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
      <Col sm={5}>
        <Navbar.Form>
          <Search />
        </Navbar.Form>
      </Col>
      <Nav pullRight>
        <IssueAddNavItem />
        <SignInNavItem />
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
      <hr />
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
