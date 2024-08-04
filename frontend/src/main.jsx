import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Store } from './app/Store.jsx'
import { Provider } from 'react-redux'
import "./assets/styles/index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
  </Provider>,
)
