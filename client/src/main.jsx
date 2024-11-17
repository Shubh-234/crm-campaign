import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId= '23699610254-n1crd42uns3tg7kg29e1m1nuuihiaqk0.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
);
