import React from 'react';
import Header from '../components/Header';

const ExplorePage = () => (
  <div>
    {/** É necessario passar props pageTitle com o valor
    de: "Explorar" e showSearch = { false } para o header */}
    <Header pageTitle="Explorar" showSearch={ false } />
  </div>
);

export default ExplorePage;
