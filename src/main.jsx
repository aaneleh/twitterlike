import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

import { LogonProvider } from './contexts/LogonContext'

import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import User from './pages/user'
import Notifications from './pages/notifications'
import Search from './pages/search'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <LogonProvider>
      <main className="bg-slate-300 text-slate-950 dark:bg-slate-900 dark:text-slate-100 
      h-screen flex flex-col items-center justify-between">
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/user/:id' element={ <User/> }/>
          <Route path='/notifications' element={ <Notifications/> }/>
          <Route path='/search' element={ <Search/> }/>
        </Routes>
      </main>
    </LogonProvider>
  </Router>
)
