import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux'
import AppProvider from "./context/AppContext.jsx"
import store from './Redux/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>
  </React.StrictMode>
)
