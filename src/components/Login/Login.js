import React , {useState , useEffect , useReducer} from 'react'

import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'
import classes from './Login.module.css'

const emailReducer = (state , action) =>{
  if (action.type === 'USER_INPUT') {
    return {value: action.val  , isValid: action.val.includes('@')}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value , isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false}
} 

const passwordReducer = (state , action) =>{
  if (action.type === 'USER_INPUT') {
    return {value: action.val  , isValid: action.val.trim().length > 6}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value , isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false}
}

const Login = (props) => {
 
  const [formValid , setFormValid] = useState(false)

  const [emailState, dispatchEmail] = useReducer(emailReducer , {value: '' , isValid: undefined})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer , {value: '' , isValid: undefined})

  const { isValid: emailIsValid } = emailState
  const { isValid: passwordValid } = passwordState

  useEffect(() => {
    const identifier = setTimeout(() => {        
      console.log(123);
      setFormValid(
        emailIsValid && passwordValid
      )
    }, 500)

    return () =>{
      console.log(456)
      clearTimeout(identifier)
    }
  } , [emailIsValid , passwordValid])

  const enterEmailHandler = (event) =>{
    dispatchEmail({type:'USER_INPUT' , val: event.target.value})

    // setFormValid(
    //   event.target.value.includes('@') && password.trim().length > 6
    // )
  }
  const enterPasswordHandler = (event) =>{
    dispatchPassword({type: 'USER_INPUT' , val: event.target.value})

    // setFormValid(
    //   emailState.isValid  && event.target.value.trim().length > 6
    // )
  }

  const validateEmail = () =>{
    dispatchEmail({type: 'INPUT_BLUR'})
  }

  const validatePassword = () =>{
    dispatchPassword({type: 'INPUT_BLUR'})
  }


  const loginHandler = (event) =>{
    event.preventDefault()
    props.onLogin(emailState.value , passwordState.value)
  }
  return (
    <Card className={`${classes.login}`}>
      <form onSubmit={loginHandler}>
        <div className={ `${classes.control} ${emailState.isValid === false ? classes.invalid : ''}` }>
            <label htmlFor="email">E-mail</label>
            <input 
            //元素失去焦點時觸發相應的事件處理函數
            onBlur={validateEmail}
            onChange={enterEmailHandler}
            value={emailState.value}
            id='email' 
            type="text" />
        </div>
        <div className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''}`}>
            <label htmlFor="password">password</label>
            <input 
            onBlur={validatePassword}
            onChange={enterPasswordHandler}
            value={passwordState.value}
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
