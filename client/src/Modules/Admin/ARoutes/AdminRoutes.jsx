import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminHome from '../AComponents/AdminHome'
import ViewUser from '../AComponents/ViewUser'
export default function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AdminHome/>}/>
        <Route path='/ViewUser' element={<ViewUser/>}/>
      </Routes>
    </div>
  )
}
