import React, {useState} from 'react'
import './css/Login.css'
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';

function Login() {
    const history  = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = e => {
        e.preventDefault();

        //firebase login
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
        
    }
    const register = e => {
        e.preventDefault();

        //firebase register
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                //success create user
                console.log(auth);
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
            <Link to='/'>
            <img className='login__logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Amazon.co.jp_logo.svg/1280px-Amazon.co.jp_logo.svg.png' alt=''/>
            </Link>
            <div className='login__container'>
                <h1>Sign In</h1>
                <form>
                    <h5>Email:</h5>
                    <input type='text' value={email} 
                    onChange={e => setEmail(e.target.value)}/>
                    <h5>Password:</h5>
                    <input type='password' value={password}
                    onChange={e => setPassword(e.target.value)} />
                    <button onClick={signIn} type='submit'
                    className='login__SigninBtn'>Sign In</button>
                </form>

                <p>
                By continuing, you agree to website Conditions of Use and Privacy Notice.
                </p>
                <button onClick={register}
                className='login__newAccountBtn'>Create a new account.</button>
            </div>

        </div>
    )
}

export default Login
