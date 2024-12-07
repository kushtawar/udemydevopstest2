import { FaShoppingCart, FaUser } from 'react-icons/fa';

import {
  Navbar,
  Nav,
  Container,
  NavLink,
  NavDropdown,
  Badge,
} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBox from './SearchBox';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation(); //RTK Mutation returns a tuplr

  const [theme, setTheme] = useState('light');
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      console.log('savedTheme', savedTheme);
      document.body.classList.toggle(savedTheme, true); // Apply saved theme class to body
    }
  }, [theme]);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    document.body.classList.remove(
      'light',
      'blue-theme',
      'dark-theme',
      'green-theme'
    );
    console.log('selectedTheme', selectedTheme);
    document.body.classList.add(selectedTheme + '-theme');
    setTheme(selectedTheme);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      // dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar expand="md" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand className="navbarBrand d-flex align-items-center ">
              <img
                src={logo}
                alt="pic"
                className="rounded-circle img-50x50 me-1"
              />
              <span>Shop</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="search-nav"
            className="d-md-none"
          ></Navbar.Toggle>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-md-between"
          >
            <SearchBox className="d-none d-md-block" />
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <NavLink className="d-md-none">
                  <FaShoppingCart className="navbarBrand" /> {/* Cart */}
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="orange"
                      style={{
                        marginLeft: '0px',
                        fontSize: '0.5em',
                        position: 'relative',
                        top: -9,
                        right: -1,
                        backgroundColor: 'orange',
                      }}
                    >
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </NavLink>
              </LinkContainer>
              <LinkContainer to="/cart">
                <NavLink className="d-none d-md-inline">
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                    }}
                  >
                    <FaShoppingCart className="navbarBrand" />
                    {cartItems.length > 0 && (
                      <Badge
                        pill
                        style={{
                          color: 'orange',
                          font: 'large',
                          position: 'absolute',
                          top: -10,
                          right: -14,
                          fontSize: '0.7em',
                        }}
                      >
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </div>
                </NavLink>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown
                    // Add a custom class to the NavDropdown
                    title={userInfo.name}
                    id="username"
                    className="headerRightMargin"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="custom-dropdown-item">
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/settings">
                      <NavDropdown.Item className="custom-dropdown-item">
                        Settings
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown
                      title="Theme"
                      drop="end"
                      className="px-2 custom-dropdown-item" // Add a class for styling purposes if needed
                      show={themeDropdownOpen}
                      onMouseEnter={() => setThemeDropdownOpen(true)}
                      onMouseLeave={() => setThemeDropdownOpen(false)}
                      style={{ fontWeight: 'bold' }}
                    >
                      <NavDropdown.Item
                        className="custom-dropdown-item"
                        onClick={() => handleThemeChange('light')}
                      >
                        Light
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="custom-dropdown-item"
                        onClick={() => handleThemeChange('blue')}
                      >
                        Blue
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="custom-dropdown-item"
                        onClick={() => handleThemeChange('dark')}
                      >
                        Dark
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="custom-dropdown-item"
                        onClick={() => handleThemeChange('green')}
                      >
                        Green
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown.Item
                      className="custom-dropdown-item"
                      onClick={logoutHandler}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <NavLink className="d-md-none">
                      <FaUser /> Sign In
                    </NavLink>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavLink href="/login" className="d-none d-md-block">
                      <FaUser />
                    </NavLink>
                  </LinkContainer>
                </>
              )}
              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminLink"
                  className="headerRightMargin"
                >
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item className="custom-dropdown-item">
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item className="custom-dropdown-item">
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item className="custom-dropdown-item">
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <SearchBox className="d-block d-md-none" />
      </Container>
    </header>
  );
};

export default Header;
