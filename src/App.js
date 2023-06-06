import Login from './components/Login/Login';
import './App.css';

function App() {

  const loginHandler = () =>{
    setIsLoggedIn(true)
  }
  return (
    <div className="App">
      <Login onLogin={loginHandler}></Login>
    </div>
  );
}

export default App;
