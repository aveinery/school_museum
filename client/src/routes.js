import { Component } from 'react';
import { CONTACTS_ROUTE, DOCUMENTS_ROUTE, GID_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, NEWS_ROUTE } from './utils/consts';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import DocumentsPage from './pages/DocumentsPage';
import ContactsPage from './pages/ContactsPage';
import NewsPage from './pages/NewsPage';
import VirtualGidPage from './pages/VirtualGidPage';

export const authRoutes = [
  {
    path: '',
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: DOCUMENTS_ROUTE,
    Component: DocumentsPage,
  },
  {
    path: CONTACTS_ROUTE,
    Component: ContactsPage,
  },
  {
    path: NEWS_ROUTE,
    Component: NewsPage,
  },
  {
    path: GID_ROUTE,
    Component: VirtualGidPage,
  },
];
