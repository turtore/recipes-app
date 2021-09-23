import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DetailsRecipePage from './pages/DetailsRecipePage';
import MealRecipePage from './pages/MealRecipePage';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route exact path="/comidas" component={ MealRecipePage } />
      <Route exact path="/comidas/:recipeId" component={ DetailsRecipePage } />
      <Route
        exact
        path="/bebidas/:recipeId"
        component={ DetailsRecipePage }
      />
      {/* <Route exact path="/comidas" component={ MealRecipesPage } />
      <Route exact path="/bebibas" component={ CocktailRecipesPage } />
      <Route exact path="/comidas/:id-da-receita" component={ DetailsMealRecipesPage } />
      <Route
        exact
        path="/bebidas/:id-da-receita"
        component={ DetailsCocktailRecipesPage }
      />
      <Route
        exact
        path="/comidas/:id-da-receita/in-progress"
        component={ ProgressMealRecipePage }
      />
      <Route
        exact
        path="/bebidas/:id-da-receita/in-progress"
        component={ ProgressCocktailRecipePage }
      />
      <Route exact path="/explorar" component={ ExplorePage } />
      <Route exact path="/perfil" component={ ProfilePage } />
      <Route exact path="/receitas-feitas" component={ MakeRecipesPage } />
      <Route exact path="/receitas-favoritas" component={ FavoritesRecipesPage } /> */}
    </Switch>
  );
}

export default App;
