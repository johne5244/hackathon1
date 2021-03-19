import React,{useContext, useState, useEffect} from 'react'
import { GlobalValue } from './GlobalApp'
import {app} from "./Base"
import { Button } from 'antd'


const db = app.firestore().collection("AuthUser")
const db1 = app.firestore().collection("post")
function Home() {

 const {current} = useContext(GlobalValue)
 const [data, setData] = useState([])


 const getData = async()=>{
  await db.onSnapshot((snapshot)=>{
    const i = []
    snapshot.forEach((doc)=>{
      i.push({...doc.data(), id : doc.id})
    })
    setData(i)
   })
  }
  console.log(data)

  useEffect(()=>{
    getData()
  },[])

  return (
    <div style={{
      display :"flex",
      flexDirection :"column",
      justifyContent : "center",
      alignItems : "center",
    }}>
      {current && current.email}
      {
        data.map(({id, Photo })=>(
          <div id={id}>
             <img src={Photo} alt="" style={{
              height : "100px",
              width : "100px",
              borderRadius : "50%"
             }}/>
            </div>

        ))
      }
      
      <h1> Welcome to the Home Page </h1>

<div style={{
  minHeight : "300px",
  display:"flex",
  justifyContent : "space-evenly",
  flexDirection : "column"
}}>
      
      <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          
        }}
        type="file"
      />

      <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }}
       
        />

      <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }}/>

      <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }}/>

        <Button> Add House </Button>

    
</div>   
      
    </div>
  )
}

export default Home
