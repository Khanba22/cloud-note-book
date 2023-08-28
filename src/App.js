import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="containers">
        <nav>
          <div className="brand-name">
            <h2>C</h2>
            <h2>loud</h2>
            <h2>N</h2>
            <h2>otebook</h2>
          </div>
          <div className="nav-links">
            <a href="/">Product</a>
            <a href="/">Solutions</a>
            <a href="/">Design</a>
            <a href="/">Enterprise</a>
          </div>
        </nav>
        <div className="left-blurry-circles"></div>
        <div className="left-info-box">
        </div>
        <div className="left-info-box">
          <div className="left-info-box-heading">
            <h2>Create.</h2>
            <h2>Edit.</h2>
            <h2>Share.</h2>
          </div>
          <p>
            Cloud Notebook Provides a platform to Create , share , edit and Find notes for any subjects provided by users itself. And its completely Free.
          </p>
          <div className="button-box">
            <button className='login-button'><Link style={{color:"white"}} to="/signup">Signup</Link></button>
            <button><Link to="/login">Login</Link></button>
          </div>
        </div>
        <div className="design-box">
          <div className="curve">
            <p>---------------</p>
            <p>---------------</p>
            <p>---------------</p>
          </div>
          <div className="blue-circle-overlap"></div>
          <div className="dark-box">
            <div className="blue-circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
