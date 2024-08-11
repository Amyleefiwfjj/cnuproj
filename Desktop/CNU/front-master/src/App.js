import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import MyPage from './components/MyPage/MyPage';
/*import Schedule from './components/schedule/schedule';*/
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mypage" element={<MyPage />} />
          {/*<Route path="/schedule" element={<Schedule />} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
