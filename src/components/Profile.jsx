import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import './styles/profile.css';

const Profile = () => {
  const [email, setEmail] = useState('alguem@alguem.com');
  const history = useHistory();

  // Pego o email que está no local storage na montagem do componente e seto ele no estado
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setEmail(user.email);
  }, []);

  // Limpa o local storage e retorna pra tela inicial
  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  /* Parametro 'route' é a rota da pagina que deve ser dado o push
  exemplo: se eu passo por parametro '/', vai pra tela inicial. */
  const handleClick = (route) => {
    history.push(route);
  };

  return (
    <div className="text-center">
      <p data-testid="profile-email">
        { email }
      </p>

      <button
        type="button"
        className="btn btn-outline-dark btn-settings"
        data-testid="profile-done-btn"
        onClick={ () => handleClick('/receitas-feitas') }
      >
        Receitas Feitas
      </button>

      <button
        type="button"
        className="btn btn-outline-dark btn-settings"
        onClick={ () => handleClick('/receitas-favoritas') }
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </button>

      <button
        type="button"
        className="btn btn-outline-danger btn-settings"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Sair
      </button>
    </div>
  );
};

export default Profile;
