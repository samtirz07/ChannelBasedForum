import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Landing} from './pages/Landing';
import { NavBar } from './components/NavBar';
import { NoMatch } from './components/NoMatch';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ViewChannels } from './pages/ViewChannels';
import { CreateChannel } from './pages/CreateChannel';
import { Channel } from './pages/Channel';
import { PostPage } from './pages/PostPage';
import { Users } from './pages/Users';

function App() {
  
  const [name, setName] = useState('');
  const [userID, setUserID] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
      <div>
          <Router>
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserID={setUserID} name={name} setName={setName} userID={userID}/>
            <Routes>
              <Route exact path="/" element={<Landing loggedIn={loggedIn} name={name} setLoggedIn={setLoggedIn} setID={setUserID} setName={setName}/> } />
              <Route path="*" element={<NoMatch />}/>

              <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setID={setUserID} setName={setName}/> } />
              <Route path="/signUp" element={<SignUp loggedIn={loggedIn} />} />

              <Route path="/viewChannels" element={<ViewChannels userID={userID} loggedIn={loggedIn}/>} />
              <Route path="/viewChannels/:slug" element={<Channel userID={userID} loggedIn={loggedIn}/>} />
              <Route path="/createChannel" element={ <CreateChannel userID={userID} loggedIn={loggedIn}/> } />
              <Route path="/posts/:slug" element={<PostPage userID={userID} loggedIn={loggedIn}/>} />

              <Route path="/users" element={<Users userID={userID} loggedIn={loggedIn}/>} />

            </Routes>
          </Router>
      </div>
  );
}

export default App;
