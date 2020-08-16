import React, {useState , useEffect} from 'react';

import './App.css';
import Post from './Post';
import {db, auth} from './firebase'
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const[modalStyle] = React.useState(getModalStyle);
  const[posts, setPosts]= useState([]);
  const[open, setOpen]= useState(false);
  const[username, setUsername]= useState('');
  const[email, setEmail]= useState('');
  const[password, setPassword]= useState('');
  const[user, setUser]= useState(null);
  const[openSignIn, setopenSignIn] = useState(false)
  
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
        if (authUser){
            console.log(authUser)
            setUser(authUser)

            if(authUser.displayName){
              
            }
            else{
              return authUser.updateProfile({
                displayName:username
              })
            }
        }
        else{
            setUser(null);
          
        }
    })

    return ()=>{
      unsubscribe();
    }


  },[user,username])

 useEffect(()=>{
          db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{

            setPosts(snapshot.docs.map(doc=>({
              id: doc.id,
              post:doc.data()
            })
            ))

          })

      },[])


      const signUp =(event)=>{
          event.preventDefault();
      
      auth.createUserWithEmailAndPassword(email,password).catch((error)=> alert(error.message));
      
    setOpen(false)};


      const signIn =(event)=>{
          event.preventDefault();
      auth.signInWithEmailAndPassword(email,password).catch((error)=> alert(error.message))
      
    setopenSignIn(false)};

  return (
    <div className="App">

   





        <Modal open={open}
              onClose={()=>setOpen(false)}
              >
    
                <div style={modalStyle} className={classes.paper}>
                    <center>
                        <img className="app__modalImage"
                                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                    alt="Instagram"/> 
                          <form className="app__signup">
                               <Input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e)=>setUsername(e.target.value)}
                                    />

                                <Input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />

                                <Input
                                        type="text"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />

                                 <Button type="submit" onClick={signUp}>Sign Up</Button>
                           </form>
                    </center>

                </div>
         </Modal>






         <Modal open={openSignIn}
              onClose={()=>setopenSignIn(false)}
              >
    
                <div style={modalStyle} className={classes.paper}>
                    <center>
                        <img className="app__modalImage"
                                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                    alt="Instagram"/> 
                          <form className="app__signup">
                               
                                <Input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />

                                <Input
                                        type="text"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />

                                 <Button type="submit" onClick={signIn}>Sign In</Button>
                           </form>
                    </center>

                </div>
         </Modal>






          <div className="app_header">
                  
                  <img className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt="Instagram"
                  
                  />


                {user? (
                            <Button onClick={()=>auth.signOut()}>Logout</Button>
                          ):
                          <div className="app__loginCOntainer">

                            <Button onClick={()=>setopenSignIn(true)}>Sign In</Button>
                            <Button onClick={()=>setOpen(true)}>Sign Up</Button>

                          </div>
                          }

          </div>
{user?.displayName ?(
  <ImageUpload username={user.displayName}/>
):
(<h3> Sorry! You need to Login to Upload</h3>)}
          

          
    <div className="app__posts">
      
        {
            posts.map(({id,post})=>(
                <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))}       
          
      
      
      </div>     




      
    </div>
  );
}

export default App;
