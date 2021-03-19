import React,{useEffect, useState} from 'react'
import {app} from "./Base"
import {Link} from "react-router-dom"

const db = app.firestore().collection("Post")
function DashBoard() {

  const [data, setData] = useState([])

  const getData = async()=>{
  await db.onSnapshot((snapshot)=>{
    const i = []
    snapshot.forEach((doc)=>{
      i.push(doc.data)
    })
    setData(i)
   })
  }

  useEffect(()=>{
    app.auth().onAuthStateChange((user)=>{
      setData(user)
    })
  })

  return (
    <div style={{
      display :"flex",
      flexWrap : "wrap",
      justifyContent : "center"
    }}>

       <header style={{
         minHeight :"20vh",
         display:"flex",
         justifyContent:"space-between",
         flexDirection : "row",
         backgroundColor : "lightblue"
       }}>

         {data && data.image1}
         
         <Link to="/">
          
         <button>
           Home
         </button>

         </Link>

       </header>

       <body style={{
         minHeight : "60vh",
         display : "flex",
         flexDirection : "column",
         justifyContent : "center",
         alignItems : "center"
       }}>

        <div>

          <input/>

          <input/>

          <input/>


        </div>

       </body>

    </div>
  )
}

export default DashBoard
