import Login from './components/Login/Login';
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'
import React , {useState} from 'react'
import './App.css';

function App() {
  const [isLoggedIn ,setIsLoggedIn] = useState(false)

  const loginHandler = (email , password) =>{

    setIsLoggedIn(true)
  }

  const logoutHandler = ()=> {
    setIsLoggedIn(false)
  }
  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}>
        <main>
          { !isLoggedIn && <Login onLogin={loginHandler}></Login> }
          { isLoggedIn && <Home onLogout={logoutHandler}></Home> }
        </main>
      </MainHeader>
    </React.Fragment>
  );
}

export default App;
