import { Component } from 'react';
import { CONTACTS_ROUTE, DOCUMENTS_ROUTE, GID_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, NEWS_ROUTE } from './utils/consts';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import DocumentsPage from './pages/DocumentsPage';
import ContactsPage from './pages/ContactsPage';
import NewsPage from './pages/NewsPage';
import VirtualGidPage from './pages/VirtualGidPage';
import WithLayout from '../WithLayout';

export const authRoutes = [
  {
    path: '',
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    element: (
      <WithLayout>
        <MainPage />
      </WithLayout>
    ),
  },
  {
    path: LOGIN_ROUTE,
    element: <LoginPage />,
  },
  {
    path: DOCUMENTS_ROUTE,
    element: (
      <WithLayout>
        <DocumentsPage />
      </WithLayout>
    ),
  },
  {
    path: CONTACTS_ROUTE,
    element: (
      <WithLayout>
        <ContactsPage />
      </WithLayout>
    ),
  },
  {
    path: NEWS_ROUTE,
    element: (
      <WithLayout>
        <NewsPage />
      </WithLayout>
    ),
  },
  {
    path: GID_ROUTE,
    element: (
      <WithLayout>
        <VirtualGidPage />
      </WithLayout>
    ),
  },
];
