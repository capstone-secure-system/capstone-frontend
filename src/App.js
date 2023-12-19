import React, { useState, useEffect, useRefr } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'; // App.css 파일을 import
import LogContainer from './component/LogContainer';
import AppHeader from './component/AppHeader';
import Video from './component/Video';

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route path="/streaming" element={<Video/>}/>
          <Route path="/logs" element={<LogContainer/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
