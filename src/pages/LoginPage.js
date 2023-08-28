import React, { useState } from 'react'
import "./StyleSheets/loginpage.css"
// import { Link } from 'react-router-dom'
import SuccessPage from './components/SuccessPage'
import { Link } from 'react-router-dom';
import username from "./images/icons8-user-64.png"
import password from "./images/icons8-password-24.png"
// import axios from 'axios';


function LoginPage() {

  const url = window.location.href
  let data = [];
  if (url.includes("?")) {
    let params = url.split("?")
    params = params[1].split("&")
    params.forEach(el => {
      let key_value = el.split("=")
      data.push(key_value[1])
    })
  } else {
    data[0] = null;
    data[1] = null;
  }

  const user = {
    username: '',
    password: '',
  }

  const [details, setDetails] = useState(user)
  //Change later to false
  const [log, setLogin] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDetails({
      ...details,
      [name]: value
    })
  }


  const login = async (e) => {
    e.preventDefault()
    const loginData = {
      ...details,
      noteUser: data[0],
      noteId: data[1],
    }
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client(https://www.thunderclient.com)",
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Some proxies might need this to confirm that the request is an AJAX request
      },
      body: JSON.stringify(loginData)
    }
    try {
      await fetch("https://cloudnotebook-2uop.onrender.com/login", options)
        .then((response => response.json())).then((response) => {
          console.log(response)
          if (response === "Login SuccessFul") {
            setLogin(true)
          } else if (response === "Login Successful+No Note Found") {
            setLogin(true)
            alert("No Note Found For The Link")
          } else {
            alert(response)
            setLogin(false)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <div id="container">
        <nav>
          <div className="brand-name" style={{ position: "relative", top: "10px", margin: "10px 50px;" }}><h2>C</h2><h2>loud</h2><h2>N</h2><h2>otebook</h2></div>
          <div className="nav-links">
            <a href="/">Product</a>
            <a href="/">Solutions</a>
            <a href="/">Design</a>
            <a href="/">Enterprise</a>
          </div>
        </nav>
        <div className="signup-page-message-box">
          <div className="signup-heading">
            <h1>J</h1>
            <h1>oin</h1>
            <h1>T</h1>
            <h1>he</h1>
            <h1>R</h1>
            <h1>evolution</h1>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis adipisci nostrum autem necessitatibus amet reprehenderit voluptatibus vitae, dolorem quasi aut quis sapiente nam omnis. Corporis deserunt nisi omnis eos veritatis ullam expedita?</p>
        </div>
        {!log ?
          <div className="screen">
            <div className="screen__content">
              <h1 id='loginheading'>Login</h1>
              <form className="login">
                <div className="login__field">
                  <i className='login__icon'><img src={username} alt="" /></i>
                  <input onChange={handleChange} type="text" name='username' className="login__input" value={details.username} placeholder="User name / Email" />
                </div>
                <div className="login__field">
                  <i className='login__icon'><img src={password} alt="" /></i>
                  <input onChange={handleChange} type="password" name='password' value={details.password} className="login__input" placeholder="Password" />
                </div>
                <button onClick={login} className="button login__submit">
                  <span className="button__text">Log In Now</span>
                </button>
                <span className='alternate-link'><Link className='Link' to="/signup">Create Account </Link></span>
              </form>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>

          : <SuccessPage to="/cloudnotebook" heading={`${details.username}`} details={details} />}
      </div>
    </>
  )
}

export default LoginPage
