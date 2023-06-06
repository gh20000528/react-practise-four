import React , {useState , useEffect} from 'react'

import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import classes from './Login.module.css'

const Login = (props) => {
  const [email , setEmail] = useState('')
  const [emailValidate, setEmailValidate] = useState()
  const [password , setpassword] = useState('')
  const [passwordValidate , setPasswordValidate] = useState()
  const [formValid , setFormValid] = useState(false)

  useEffect(() => {
    const identifier = setTimeout(() => {        
      console.log(123);
      setFormValid(
        email.includes('@') && password.trim().length > 6
      )
    }, 500)

    return () =>{
      console.log(456)
      clearTimeout(identifier)
    }
  } , [email , password])

  const enterEmailHandler = (event) =>{
    setEmail(event.target.value)

    // setFormValid(
    //   event.target.value.includes('@') && password.trim().length > 6
    // )
  }
  const enterPasswordHandler = (event) =>{
    setpassword(event.target.value)

    // setFormValid(
    //   event.target.value.trim().length > 6 && email.includes('@')
    // )
  }

  const validateEmail = () =>{
    setEmailValidate(email.includes('@'))
  }

  const validatePassword = () =>{
    setPasswordValidate(password.trim().length > 6)
  }


  const loginHandler = (event) =>{
    event.preventDefault()
    props.onLogin(email , password)
  }
  return (
    <Card className={`${classes.login}`}>
      <form onSubmit={loginHandler}>
        <div className={ `${classes.control} ${emailValidate === false ? classes.invalid : ''}` }>
            <label htmlFor="email">E-mail</label>
            <input 
            //元素失去焦點時觸發相應的事件處理函數
            onBlur={validateEmail}
            onChange={enterEmailHandler}
            value={email}
            id='email' 
            type="text" />
        </div>
        <div className={`${classes.control} ${passwordValidate === false ? classes.invalid : ''}`}>
            <label htmlFor="password">password</label>
            <input 
            onBlur={validatePassword}
            onChange={enterPasswordHandler}
            value={password}
            type="password" 
            id="password" />
        </div>
        <div className={classes.actions}>
            <Button 
            type='submit' 
            className={classes.btn} 
            disabled={!formValid}>
                Login
            </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
