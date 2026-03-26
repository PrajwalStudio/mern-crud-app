import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminHome from '../AComponents/AdminHome'
export default function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminHome/>}/>
      </Routes>
    </div>
  )
}
