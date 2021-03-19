import React,{useContext, useState, useEffect} from 'react'
import './Header.css'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import { GlobalValue } from './Test/GlobalApp'
import {app} from "./Test/Base"
import {Link, useHistory} from "react-router-dom"
import Logo from "./logo.svg"


function Header() {
  const hist = useHistory()
  const {current} = useContext(GlobalValue)
  const [open, setOpen] = useState(false)

  const Check = ()=>{
    setOpen(!open)
  }

  const SignOut = async()=>{
    await app.auth().signOut()
    window.location.reload(true)
    hist.push("/")
  }

  return (
    <div className='MainHeaderDiv'>
      <div className='SubHeaderdiv'>

      <Link style={{
        cursor : "pointer"
      }} to="/">

        <img src={Logo} alt='' className='LogoDiv' />
      </Link>   
        {
          current ? <Button onClick={()=>{
            SignOut();
          }}>Signout</Button> : 
          <Button onClick={()=>{
            hist.push("/signIn")
          }}>Become an Agent </Button>
        }
      </div>
    </div>
  )
}

export default Header
