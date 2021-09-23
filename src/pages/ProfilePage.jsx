import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProfilePage = () => (
  <div>
    {/** É necessario passar props pageTitle com o valor
     * de: "Perfil" para o header */}
    <Header pageTitle="Perfil" showSearch={ false } />
    <Footer />
  </div>
);

export default ProfilePage;
