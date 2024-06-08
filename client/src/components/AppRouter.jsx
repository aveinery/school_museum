import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from '../routes.jsx';
import Main from '../pages/MainPage';

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} exact element={element} />
      ))}
      <Route path="*" element={<Main />} />
    </Routes>
  );
};

export default AppRouter;
