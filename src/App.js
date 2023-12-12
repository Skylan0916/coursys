import './App.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import config from './amplifyconfiguration.json';
import Sidebar from './Components/Sidebar';
import Course from "./Components/Course";
import Browse from "./Components/Browse";
import Progress from "./Components/Progress";
import Advising from "./Components/Advising";
import Profile from "./Components/Profile";
import Admin from "./Components/Admin";

Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <div className="App">

      <Sidebar />

      <div className="Path">
        Path / Placeholder / text
      </div>

      <div className="Session">
        Logged in as {user.username}. <a className="SignOut" onClick={signOut}>Sign out</a>
      </div>

      <div className="Content">
        <BrowserRouter>
          <Routes>
            <Route path="/course" element={<Course />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/advising" element={<Advising />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Navigate replace to="/course" />} />
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default withAuthenticator(App);