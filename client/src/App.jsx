import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.jsx';
import Header from './components/UI/Header/Header.jsx';
import Footer from './components/UI/Footer/Footer.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

