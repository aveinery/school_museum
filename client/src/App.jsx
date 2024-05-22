import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.jsx';
import Header from './components/UI/Header/Header.jsx';
import Footer from './components/UI/Footer/Footer.jsx';
import { useContext, useEffect } from 'react';
import { Context } from './main.jsx';

function App() {
  const { user } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      user.setIsAuth(true);
    }
  }, [user]);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

