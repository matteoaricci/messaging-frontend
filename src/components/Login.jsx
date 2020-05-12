import React, {useState} from 'react';

const Login = ( props ) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

   const handleSubmit = (event) => {
       event.preventDefault();
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                "Content-type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            localStorage.setItem("token", data.token)
            props.handleLogin(data.user)
        })
    }

    return (
        <div>
            <h1 className="login-header">Login!</h1>
            <form onSubmit={event => handleSubmit(event)}>
                <input name="username"onChange={event => setUsername(event.target.value)} value={username} type="text"/>
                <input name="password" onChange={event =>setPassword(event.target.value)} value={password} type="password"/>
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Login;
