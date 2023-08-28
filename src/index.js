import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage';
import SignUp from "./pages/SignUp"
import Layout from './pages/Layout';
import CloudNoteBook from './pages/CloudNoteBook';
import WritingPage from './pages/WritingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route index  element={<App />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUp/>} />
          <Route path='cloudnotebook' element ={<CloudNoteBook/>} />
          <Route path='cloudnotebook/notes' element = {<WritingPage/>}/>
          <Route  path='/' element = {<WritingPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
