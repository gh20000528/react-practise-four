import React , {useState , useEffect} from 'react'

import Login from './components/Login/Login';
import Home from './components/Home/Home'
import AuthContext from './store/auth-context'
import MainHeader from './components/MainHeader/MainHeader'

function App() {
  const [isLoggedIn ,setIsLoggedIn] = useState(false)

  useEffect( () => {
    const userLogin = localStorage.getItem('isLoggedIn')
  
    if (userLogin === '1') {
      setIsLoggedIn(true)
    }
  }, [])
  const loginHandler = (email , password) =>{
    localStorage.setItem('isLoggedIn' , '1')
    setIsLoggedIn(true)
  }

  const logoutHandler = ()=> {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false)
  }
  return (

    <AuthContext.Provider 
    value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler
    }}>
      <MainHeader/>
      <main>
        { !isLoggedIn && <Login onLogin={loginHandler}></Login> }
        { isLoggedIn && <Home onLogout={logoutHandler}></Home> }
      </main>
    </AuthContext.Provider>

  );
}

export default App;
