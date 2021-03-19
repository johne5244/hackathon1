import React,{useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"
import {app} from "./Base"

const db = app.firestore().collection("AuthUser")
function SignIn() {
  const hist = useHistory()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword ] = useState("")
  const [image1, setImage1] = useState(null)
  const [name, setName ] = useState("")
  const [bio, setBio] = useState("")


  const SignIN = async()=>{
    const newUser = await app.auth().createUserWithEmailAndPassword(email,password);
    if(newUser){
      await db.doc(newUser.user.uid).set({
        name,
        email,
        password,
        Photo : await image1,
        bio
      })
      alert("Welcome")
      hist.push("/")
    }
  }

  const SignUP = async()=>{
   const User = await app.auth().signInWithEmailAndPassword(email, password)

   if(User){
     alert("Welcome")
     hist.push("/")
     window.location.reload(true)
   }
  }

  const ImageUrl = async(e)=>{
    const file = e.target.files[0]
    const store = app.storage().ref()
    const Child = store.child(file.name)
    await Child.put(file)
    setImage1(await Child.getDownloadURL())
  }


  const Show = ()=>{
    setOpen(!open)
  }


  return (

    <div style={{
      minHeight :"100vh",
      minWidth : "100vw",
      display : "flex",
      flexWrap : "wrap",
      justifyContent : "center",
      alignItems : "center",
    }}>
      
      {open ? ( 
        <div style={{
          display:"flex",
          flexDirection :"column",
          minHeight :"40vh",
          justifyContent :"space-between"
        }}>

        <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }} 
        value={email}
        type="text"
        placeholder ="Email"
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        />

        <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }} 
        value={password}
        type="password"
        placeholder ="Password"
        
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        />
     <center>

        <button style={{
          height : "30px",
          width : "100px",
          display :"flex",
          color : "white",
          backgroundColor : "lightblue",
          border : "none",
          outline : "none",
          justifyContent : "center",
          alignItems : "center"
        }}
        onClick={SignUP}
        >
          SignUp
        </button>

        </center>

        <div style={{
           display:"flex",
           flexDirection:"row",
           justifyContent:"space-evenly",
           alignItems : "center"
        }}>
        
         <p>Create and account</p> <a href style={{
           cursor :"pointer",
           color : "blue"
         }} onClick={Show}>SignIn</a>
        </div>

        </div>
      ) : (
        <div style={{
          minHeight : "50vh",
          display:"flex",
          flexDirection :"column",
          justifyContent :"space-between"
        }}>

       <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
        }} 
        type="file"
        placeholder ="Image"
        onChange={ImageUrl}
        />
         
         <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }} 
        type="text"
        placeholder ="name"
        
        onChange={(e)=>{
          setName(e.target.value)
        }}
        />

        <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }} 
        type="text"
        placeholder ="Email"
        
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        />

        <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }}  
        type="password"
        placeholder ="Password"
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        />

         
        <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }}  
        value={bio}
        type="text"
        placeholder ="Bio"
        
        onChange={(e)=>{
          setBio(e.target.value)
        }}
        />

         <center>
        <button style={{
          height : "30px",
          width : "100px",
          display :"flex",
          color : "white",
          backgroundColor : "lightblue",
          border : "none",
          outline : "none",
          justifyContent : "center",
          alignItems : "center"
        }}
        onClick={SignIN}
        >
          SignIn
        </button>

        </center>

        
        <div style={{
          height : "30px",
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-evenly",
          alignItems : "center"
        }}>
        
         <p>ALready have an account</p> <a href style={{
           cursor :"pointer",
           color : "blue"
         }} onClick={Show}>SignUp</a>
        </div>

        </div>
      )}

    </div>
  )
}

export default SignIn
