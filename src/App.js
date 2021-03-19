import React,{useContext} from "react"
import { BrowserRouter as Router , Switch , Route} from "react-router-dom"
import { Link } from "react-router-dom"
import DashBoard from "./Test/DashBoard";
import { GlobalVariable } from "./Test/GlobalApp";
import Home from "./Test/Home";
import SignIn from "./Test/SignIn"
import Header from "./Header"
import Dash from "./Dash"


function App() {
  return (
    <GlobalVariable>

      <Router>
        <Header/>
       <Switch>
         <Route path="/" exact component={Home}/>
         <Route path="/signIn" exact component={SignIn}/>
         <Route path="/dash" exact component={Dash}/>
       </Switch>

      </Router>
      </GlobalVariable>
  );
}

export default App;
