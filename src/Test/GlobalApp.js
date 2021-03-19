import React, {useState, useEffect, createContext} from "react"
import {app} from "./Base"

export const GlobalValue = createContext();

export const GlobalVariable =({children})=>{
  const [current , setCurrent ] = useState([])

  useEffect(()=>{
  app.auth().onAuthStateChanged((user)=>{
    setCurrent(user)
    })
  })

  return(
    <GlobalValue.Provider value={{current}}>
     {" "} {children} {""}
    </GlobalValue.Provider>
  )
}