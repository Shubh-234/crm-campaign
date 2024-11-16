import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId= {'118420178913-0h5oi9ig50ps7s0i6hvuknlg3t0697eo.apps.googleusercontent.com'}>
    <App />
    </GoogleOAuthProvider>
);
