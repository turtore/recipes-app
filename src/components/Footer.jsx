import React from 'react';
import { Button } from 'react-bootstrap';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './styles/footer.css';

const Footer = () => (
  <div className="footer-container" data-testid="footer">
    <Button
      href="/bebidas"
      type="button"
      className="btn btn-light"
    >
      <img src={ drinkIcon } alt="bebidas" data-testid="drinks-bottom-btn" />
    </Button>
    <Button
      href="/explorar"
      type="button"
      className="btn btn-light"
    >
      <img src={ exploreIcon } alt="explorar" data-testid="explore-bottom-btn" />
    </Button>
    <Button
      href="/comidas"
      type="button"
      className="btn btn-light"
    >
      <img src={ mealIcon } alt="comidas" data-testid="food-bottom-btn" />
    </Button>
  </div>
);

export default Footer;
