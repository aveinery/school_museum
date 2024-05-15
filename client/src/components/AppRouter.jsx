import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '../routes';
import { MAIN_ROUTE } from '../utils/consts';
import Main from '../pages/MainPage';

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} exact element={<Component />} />
      ))}
      <Route path="*" element={<Main />} />
    </Routes>
  );
};

export default AppRouter;
