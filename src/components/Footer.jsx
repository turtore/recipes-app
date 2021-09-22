import React from 'react';
import Link from 'react-router-dom';
import './components-css/footer.css';

const Footer = () => (
  <div id="footer-container" data-testid="footer">
    <Link to="/bebidas" data-testid="drinks-bottom-btn" />
    <Link to="/explorar" data-testid="explore-bottom-btn" />
    <Link to="/comidas" data-testid="food-bottom-btn" />
  </div>
);

export default Footer;
