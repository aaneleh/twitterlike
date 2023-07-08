import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

import Login from './pages/login'
import Register from './pages/register'
import Main from './pages/main'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <main className="bg-slate-300 text-slate-950 dark:bg-slate-900 dark:text-slate-100 
      flex min-h-screen flex-col items-center justify-between p-24 ">
        <Routes>
          <Route path='/' element={ <Main/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
        </Routes>
      </main>
  </Router>
)
