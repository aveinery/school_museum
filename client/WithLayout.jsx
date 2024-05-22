import React from 'react';
import Header from './src/components/UI/Header/Header';
import Footer from './src/components/UI/Footer/Footer';
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
