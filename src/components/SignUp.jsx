import React, {useState} from 'react';

const SignUp = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                username: username,
                name: name,
                password: password
            }
            )
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            localStorage.setItem("token", data.jwt)
            props.handleLogin(data.user)
        })
    }

    return (
        <div>
            <h1 className="sign-up-header">Sign Up!</h1>
            <form onSubmit={event=> handleSubmit(event)}>
                <input onChange={event => setUsername(event.target.value)} value={username} name="username" type="text"/>
                <input onChange={event => setName(event.target.value)} value={name} name="name" type="text"/>
                <input onChange={event => setPassword(event.target.value)} value={password} name="password" type="password"/>
                <button type='submit'>Sign Up!</button>
            </form>
        </div>
    );
}

export default SignUp;
