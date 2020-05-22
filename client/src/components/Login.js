import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const initialCredentials = {
    username: "",
    password: "",
  }

  const { push } = useHistory()
  const [credentials, setCredentials] = useState(initialCredentials)

  const handleChange = event =>{
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event =>{
    event.preventDefault()
    axiosWithAuth()
      .post("/api/login", credentials)
      .then(res =>{
        // console.log(res)
        localStorage.setItem("token", res.data.payload)
        push("/bubble")
        setCredentials(initialCredentials)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  return (
    <>
      {/* <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p> */}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={credentials.username}
          type="text"
          placeholder="Username"
          onChange={handleChange}
        ></input>
        <input
          name="password"
          value={credentials.password}
          type="text"
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
