import React from 'react';
import Header from './UI/Header/Header';
import Footer from './UI/Footer/Footer';
const WithLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default WithLayout;
