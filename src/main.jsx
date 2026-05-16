import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import store from './store/store.js';
import { SocketProvider } from './shared/providers/SocketProvider.jsx';
import './index.css';
import { seedDevAuth } from './config/devAuth';

seedDevAuth();

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <SocketProvider>
                <App />
            </SocketProvider>
        </BrowserRouter>
    </Provider>
);