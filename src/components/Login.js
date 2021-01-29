import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

const initialUser={
  username: "",
  password: ""
}

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState("");
  const history = useHistory()
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  function changeHandler(e){
    setUser({...user,
    [e.target.name]: e.target.value})
  }

  function submitHandler(e){
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", user)
    .then(res=>{
      window.localStorage.setItem("token", res.data.payload);
      history.push('/bubbles')
    })
    .catch(drama=>{
      setError(JSON.stringify(drama.error))
    })
  }

  return (
    <>
      <h1>
        Welcome to the Bubble App!
      </h1>
        <form onSubmit={submitHandler}>
          <input type="text" name="username" placeholder="Username" value={user.username} onChange={changeHandler}/>
          <input type="password" name="password" placeholder="password" value={user.password} onChange={changeHandler}/>
          <button>Go!</button>
        </form>
      <p>{error}</p>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.