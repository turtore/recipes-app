import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './styles/footer.css';

const Footer = () => (
  <div className="footer-container" data-testid="footer">
    <a href="/bebidas">
      <img src={ drinkIcon } alt="bebidas" data-testid="drinks-bottom-btn" />
    </a>
    <a href="/explorar">
      <img src={ exploreIcon } alt="explorar" data-testid="explore-bottom-btn" />
    </a>
    <a href="/comidas">
      <img src={ mealIcon } alt="comidas" data-testid="food-bottom-btn" />
    </a>
  </div>
);

export default Footer;
