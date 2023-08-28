import React, { useRef, useState } from 'react'
import "./StyleSheets/signup.css"
import SuccessPage from './components/SuccessPage';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import username from "./images/icons8-user-64.png"
import nickname from "./images/icons8-edit-user-48.png"
import password from "./images/icons8-password-24.png"
import email from "./images/icons8-email-48.png"

function SignUp() {

  const userRef = useRef(null)

  const user = {
    username: "",
    password: "",
    nickname: "",
    email: ""
  }

  const [details, setDetails] = useState(user);
  const [respond, setRespond] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setDetails({
      ...details,
      [name]: value
    })
  }

  const formValid = () => {
    if (details.username <= 8 || details.username >= 15) {
      toast.warn('Username Must be in range 8-15', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
        theme: "colored",
      });
      return false
    }
    if (details.password <= 8 || details.password >= 15 || (!(details.password.includes("#")) && !(details.password.includes("*")) && !(details.password.includes("@")) && !(details.password.includes("$")))) {
      toast.warn('Password Must be in range 8-15 and contain a special character @#$* ', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false
    }
    if (details.nickname <= 0) {
      toast.warn('Please Select a nickname', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false
    }
    return true
  }

  const sendData = async (e) => {
    console.log("Sending Data")
    e.preventDefault()
    const options = {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(details)
    }
    if (formValid()) {
      await fetch("/signup", options).then((response => response.json())).then((response) => {
        console.log(response)
        if (response === "Account Creation Successful") {
          setRespond(true)
        }
        if (response === "The User With this Email already exists") {
          toast.warn('The User With this Email already exists', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }).catch((err) => {
        alert("There might be some error in the servers please try again later")
      })
    }
  }

  return (
    <>{!respond ? <div id="container">
      <nav>
        <div class="brand-name" style={{ position: "relative", top: "10px", margin: "10px 50px;" }}><h2>C</h2><h2>loud</h2><h2>N</h2><h2>otebook</h2></div>
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
      <div className="screen">
        <div className="screen__content">
          <h1 id='signupheading'>Create Account</h1>
          <form className="signup">
            <div className="login__field">
              <i className='login__icon'><img src={username} alt="" /></i>
              <input ref={userRef} onChange={handleChange} type="text" placeholder="User Name" name='username' id='username' value={details.username} className="login__input" />
            </div>
            <div className="login__field">
            <i className='login__icon'><img src={password} alt="" /></i>
              <input onChange={handleChange} type="password" placeholder="Password" name='password' data-required="true" value={details.password} className="login__input" />
            </div>
            <div className="login__field">
            <i className='login__icon'><img src={email} alt="" /></i>
              <input onChange={handleChange} type="text" placeholder="Enter Your Email" name='email' value={details.email} className="login__input" />
            </div>
            <div className="login__field">
            <i className='login__icon'><img src={nickname} alt="" /></i>
              <input onChange={handleChange} type="text" placeholder="Pick a Nickname" name='nickname' value={details.nickname} className="login__input" />
            </div>
            <ToastContainer
              transition={Slide}
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <button onClick={sendData} className="button login__submit button__text">
              Create Account
            </button>
            <span className='alternate-link'><Link className='Link' to="/login">Already a member ? login</Link></span>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div> : <SuccessPage to="/cloudnotebook" details={details} heading={`Welcome ${details.username}`} />}</>
  )
}

export default SignUp
