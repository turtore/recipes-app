import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MealRecipePage from './pages/MealRecipePage';
import CocktailRecipePage from './pages/CocktailRecipePage';
import ExplorePage from './pages/ExplorePage';
import DetailsMealRecipePage from './pages/DetailsMealRecipePage';
import ProfilePage from './pages/ProfilePage';
import MakeRecipesPage from './pages/MakeRecipesPage';
import FavoritesRecipesPage from './pages/FavoritesRecipesPage';
// import ProgressCocktailRecipePage from './pages/ProgressCocktailRecipePage';
// import SearchBar from './components/Searchbar';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route exact path="/comidas" component={ MealRecipePage } />
      <Route exact path="/bebidas" component={ CocktailRecipePage } />
      <Route exact path="/comidas/:id-da-receita" component={ DetailsMealRecipePage } />
      <Route exact path="/explorar" component={ ExplorePage } />
      <Route exact path="/perfil" component={ ProfilePage } />
      <Route exact path="/receitas-feitas" component={ MakeRecipesPage } />
      <Route exact path="/receitas-favoritas" component={ FavoritesRecipesPage } />
      {/* <Route exact path="/sb" component={ SearchBar } /> */}
      {/* <Route
        exact
        path="/bebidas/:id-da-receita"
        component={ DetailsCocktailRecipesPage }
      /> */}
      {/* <Route
        exact
        path="/comidas/:id-da-receita/in-progress"
        component={ ProgressMealRecipePage }
      /> */}
      {/* <Route
        exact
        path="/bebidas/:id-da-receita/in-progress"
        component={ ProgressCocktailRecipePage }
      /> */}
    </Switch>
  );
}

export default App;
