import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ExplorePage = () => (
  <div>
    {/** É necessario passar props pageTitle com o valor
    de: "Explorar" e showSearch = { false } para o header */}
    <Header pageTitle="Explorar" showSearch={ false } />
    <Footer />
  </div>
);

export default ExplorePage;
