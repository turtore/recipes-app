import React from 'react';
import Header from '../components/Header';

const ProfilePage = () => (
  <div>
    {/** É necessario passar props pageTitle com o valor
     * de: "Perfil" para o header */}
    <Header pageTitle="Perfil" showSearch={ false } />
  </div>
);

export default ProfilePage;
