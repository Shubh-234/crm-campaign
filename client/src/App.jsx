import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { BrowserRouter } from 'react-router-dom';
import { Routes as Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import Audience from './components/Audience';
import Campaigns from './components/Campaigns';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <AuthContextProvider>
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* Protect the /dashboard route */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/audience"
                            element={
                                <ProtectedRoute>
                                    <Audience />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/campaigns"
                            element={
                                <ProtectedRoute>
                                    <Campaigns />
                                </ProtectedRoute>
                            }
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        </AuthContextProvider>
    );
}

export default App;
