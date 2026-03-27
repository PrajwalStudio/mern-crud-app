import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminHome from '../AComponents/AdminHome'
import ViewUser from '../AComponents/ViewUser'
import Sidebar from '../AComponents/Sidebar'
export default function AdminRoutes() {
  return (
    <Sidebar>
      <Routes>
        <Route path='/' element={<AdminHome/>}/>
        <Route path='/ViewUser' element={<ViewUser/>}/>
      </Routes>
    </Sidebar>
  )
}
