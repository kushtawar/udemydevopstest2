// App.js
import React from 'react';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="full-height">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
      {/* <SettingsScreen theme={theme} onThemeChange={toggleTheme} /> */}
    </div>
  );
};

export default App;
