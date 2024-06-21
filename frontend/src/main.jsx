import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";

import ErrorBoundary from './components/ErrorBoundry.jsx';

export const Context=createContext({isAuthenticated:false})

const Appwrapper=()=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const [user,setUser]=useState({})
  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <ErrorBoundary>
       
          <App />
       
      </ErrorBoundary>
    </Context.Provider>
  );

}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <Appwrapper/>
  </React.StrictMode>,
)
