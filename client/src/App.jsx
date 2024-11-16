import React from 'react';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import {BrowserRouter} from 'react-router-dom'
import {Routes as Switch,Route} from "react-router-dom"
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import Audience from './components/Audience';
import Campaigns from './components/Campaigns';

function App() {
  return (
    <AuthContextProvider>
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/audience" element={<Audience />} />
        <Route path="/campaigns" element={<Campaigns />} />
      </Switch>
      </BrowserRouter>
    </div>
    </AuthContextProvider>
  )
}

export default App;