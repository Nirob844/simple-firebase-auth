import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)
function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error:', error)
      })

  }
  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      })
  }
  const handleGithubSingIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error', error);
      })
  }
  return (
    <div className="App">
      {user.uid ?
        <button onClick={handleSingOut}>Sing Out</button>
        :
        <>
          <button onClick={handleGoogleSingIn}>Google sing in</button>
          <button onClick={handleGithubSingIn}>github Sing In</button>
        </>
      }
      {
        user.uid && <div>
          <h3>User Name : {user.displayName}</h3>
          <p>Email : {user.email} </p>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
