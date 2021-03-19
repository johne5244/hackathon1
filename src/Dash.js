import React,{useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { GlobalValue } from './Test/GlobalApp'
import {app} from "./Test/Base"
import { Button } from 'antd'


const db = app.firestore().collection("AuthUser")
const db1 = app.firestore().collection("post")
function DashBoard(props) {

  const {current} = useContext(GlobalValue)
  const [data, setData] = useState([])
  const [image1, setImage ] = useState(null)
  const [location, setLocation ] = useState("")
  const [price, setPrice ] = useState(0)
  const [ bedroom , setBedroom ] = useState(0)
  const [bathroom, setBathroom ] = useState(0)
  const [cars, setCars ] = useState(0)
  const [phone, setPhone] = useState(0)
  const [data1, setData1] = useState([])



 const getData = async()=>{
  await db.onSnapshot((snapshot)=>{
    const i = []
    snapshot.forEach((doc)=>{
      i.push({...doc.data(), id : doc.id})
    })
    setData(i)
   })
  }

 const User =async()=>{
  await db1.onSnapshot((snapshot)=>{
    const b = []
    snapshot.forEach((doc)=>{
      b.push({...doc.data(), id : doc.id})
    })
    setData1(b)
   })
 } 

  const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

  const classes = useStyles();
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const ImageUrl = async(e)=>{
    const file = e.target.files[0]
    const store = app.storage().ref()
    const Child = store.child(file.name)
    await Child.put(file)
    setImage(await Child.getDownloadURL())
  }


  const PostData = async()=>{
    const user = app.auth().currentUser;

    if(PostData){

      db1.doc().set({
       location,
       bedroom,
       bathroom,
       phone,
       cars,
       price,
       Photo : await image1,
       createdBy : user.uid
      })
    }
  }
  const drawer = (
    <div style={{ backgroundColor: '#031f4b', height: '100vh' }}>
      <div className={classes.toolbar} />
      <Divider />
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}

       <center>
      {
        data.map(({id, Photo,email, bio,name  })=>(
          <div key={id}>
             <img src={Photo} alt="" style={{
              height : "100px",
              width : "100px",
              borderRadius : "50%"
             }}/>

             <h3>{name}</h3>
             <p> {bio} </p>

            </div>

        ))
      }
       </center>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(()=>{
    getData();
    User();
  },[])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{ backgroundColor: '#031f4b' }} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography> */}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
       
        <Typography paragraph>
        <div style={{
                minHeight : "70vh",
                display:"flex",
                justifyContent : "space-evenly",
                flexDirection : "column",
                alignItems : "center"
                }}>

                  <h1> DASH PAGE </h1>
      
      <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          
        }}
        type="file"
        onChange={ImageUrl}
      />

      <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }}
        placeholder="location"
       value={location}
       onChange={(e)=>{
         setLocation(e.target.value)
       }}
       type="text"
        />

      <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }}
        type="number"
        placeholder ="Price"
        onChange={(e)=>{
          setPrice(e.target.value)
        }}
        />

      <input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"

        }}
        placeholder="Badroom"
        onChange={(e)=>{
          setBedroom(e.target.value)
        }}
        type="number"
        />

  <input 
   style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }}
        placeholder="Bathroom"
        onChange={(e)=>{
          setBathroom(e.target.value)
        }}
        type="number"
        />

<input style={{
          height:"30px",
          width : "300px",
          outline :"none",
          border : "1px solid lightblue",
          paddingLeft : "20px"
        }}
        placeholder ="Phone Number"
        onChange={(e)=>{
          setPhone(e.target.value)
        }}
        />

        <Button onClick={PostData}> Add House </Button>

        <hr style={{
          width : "60vh"
        }}/>


          {
            data1.map(({Photo, id,bathroom, bedroom, cars, location, phone, price })=>(
             <div key={id}>
               <img src={Photo} alt="" style={{
              height : "100px",
              width : "100px",
              borderRadius : "50%"
             }}/>
                
              <h2>{bathroom}</h2>

              <h2> {bedroom} </h2>

              <h2> {cars} </h2>

              <h2> {location} </h2>

              <h2> {phone} </h2>

              <h2> {price} </h2>

               </div>
            ))
          }
    

    
</div>   

        </Typography>
        
      </main>
    </div>
  );
}

DashBoard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashBoard;