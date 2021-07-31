
import './App.css';
import LogoApp from './assets/Logo-192.png'
import Post from './Post';
import {useState, useEffect} from 'react'
import ava from './assets/brick.png'
import {auth, db} from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import {Button, input} from '@material-ui/core'
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top : `${top}%`,
    left : `${left}%`,
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
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User has logged in..
        console.log(authUser)
        setUser(authUser)   
      } else {
        setUser(null)
        // user has log out
      }
    })
  }, [])

  useEffect( () => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
        id : doc.id,
        post : doc.data()
      })))
    })
  }, [user, username] )

  const signUp = (event)=>{
    event.preventDefault()

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) =>{
      return authUser.user.updateProfile({
        displayName: username,
      })
    }) 
    .catch((error) => alert(error.message))

    setOpen(false)
  }

  const signIn = (event) =>{
    event.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.massage))

      setOpenSignIn(false)
  }

  return (
    <div className="App">

      {/* I Want to have Caption input */}
      {user?.displayName ? (
        <ImageUpload username={ user.displayName }/>


      ) : (
        <h3>Sorry You need to Login for upload </h3>
      )}

      <Modal 
        open={openSignIn}
        onClose={()=> setOpenSignIn (true)}
      >
        <div style={modalStyle} className={classes.paper}>
            <form className='appSignUp'>

            <center>
              <img src={LogoApp} className='logoLogin' alt=""/>
            </center>

            <input
              placeholder='username'
              type='text'
              value={username}
              onChange={ (e) => setUsername(e.target.value) }
            />

            <input
              placeholder='email'
              type='text'
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />

            <input 
              placeholder='password'
              type='password'
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
            />
            
            <Button type='submit' onClick={signUp}>Sign In</Button>

            </form>

        </div>
      </Modal>
      
      <div className="app_header">
        <img src={LogoApp} className='app_headerImage'/>


            {user ? (
            <Button onClick={()=> auth.signOut()}>Log Out</Button>
          ) : (
            <div className="appLoginContainer">
              <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={()=> setOpen(true)}>Sign Up</Button>

            </div>
          )}
      
      </div>

      <div className="appPosts">
     
        {
          posts.map(({id, post}) => (
            <Post 
              key={id}
              username={post.username} 
              caption={post.caption} 
              imageUrl={post.imageUrl}
            />
          ))
        }
        
        <Post
          username='Akhmad.aldo' 
          caption=" : BHAKAKAKAKAK JDI NOLEP GLBK MALMING     MALAH NGODING" 
          imageUrl={ava}
        />
      </div>


    </div>
  );
}

export default App;
