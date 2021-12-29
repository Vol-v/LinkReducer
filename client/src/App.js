
//import './App.css';
import React from 'react';
import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/NavBar';
function App() {
  const {login,logout,token,userId} = useAuth()
  const isAuthenticated = !!token // !! это приведение к boolean. Если есть токен - значит можно авторизоваться. Если нет- нельзя
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value = {{token,userId,login,logout,isAuthenticated}}>
    <Router>
      { isAuthenticated? <Navbar/> : <h2></h2>}
    <div className="container">
      {routes}
    </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
