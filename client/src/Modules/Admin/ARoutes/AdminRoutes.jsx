import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminHome from '../AComponents/AdminHome'
import ViewUser from '../AComponents/ViewUser'
import Sidebar from '../AComponents/Sidebar'
import AddProduct from '../AComponents/AddProduct'
import AddCategory from '../AComponents/AddCategory'
import Dashboard from '../AComponents/Dashboard'
import ViewProducts from '../AComponents/ViewProducts'
import ViewCategory from '../AComponents/ViewCategory'
export default function AdminRoutes() {
  return (
    <Sidebar>
      <Routes>
        <Route path='/' element={<AdminHome/>}/>
        <Route path='/ViewUser' element={<ViewUser/>}/>
        <Route path='/ViewProducts' element={<ViewProducts/>}/>
        <Route path='/AddProduct' element={<AddProduct/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/AddCategory' element={<AddCategory/>}/>
        <Route path='/ManageCategory' element={<ViewCategory/>}/>
      </Routes>
    </Sidebar>
  )
}
