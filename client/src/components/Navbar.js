import React, {useContext,useEffect} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import { GoThreeBars } from "react-icons/go";

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }
  function start(){
    
      var elems = document.querySelectorAll('.sidenav');
      let options = {
        edge: 'right',
        draggable: true,
        inDuration: 250,
        outDuration: 200,
        onOpenStart: null,
        onOpenEnd: null,
        onCloseStart: null,
        onCloseEnd: null,
        preventScrolling: true
    }
      var instances = window.M.Sidenav.init(elems, options);
  
  }
  useEffect(()=>{
    setTimeout(start,500)
  })
  return (
    <>
    <nav>
      <div className="nav-wrapper" style={{ padding: '0 2rem' }}>
      
        <span className="brand-logo">Shorten the link</span>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger right-align" style={{float:"right",fontSize:"20px"}}><GoThreeBars/></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Create</NavLink></li>
          <li><NavLink to="/links">History</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Logout</a></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav"  id="mobile-demo">
      <li><NavLink to="/create">Create</NavLink></li>
      <li><NavLink to="/links">History</NavLink></li>
      <li><a href="/" onClick={logoutHandler}>Logout</a></li>
    </ul> 
   </> 
  )
}
