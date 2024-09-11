import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Assignment from './pages/Assignment/Assignment';
import AssignmentDetail from './pages/AssignmentDetail/AssignmentDetail';
import MeetingLog from './pages/MeetingLog/MeetingLog';
import MeetingLogView from './pages/MeetingLogView/MeetingLogView';
import ProjectDetail from './pages/project/project';
import MyPage from './components/MyPage/MyPage';
import Schedule from './components/schedule/schedule';
import './App.css';
import './style/variables.css';


function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('.text'); // 모든 .text 클래스를 가진 요소 선택

    elements.forEach(element => {
      const bgColor = window.getComputedStyle(element).backgroundColor;
      const [r, g, b] = bgColor.match(/\d+/g).map(Number);
      const brightness = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
      );

      if (brightness > 127.5) {
        element.classList.add('text-on-light'); // 밝은 배경이면 검정색 텍스트
        element.classList.remove('text-on-dark');
      } else {
        element.classList.add('text-on-dark'); // 어두운 배경이면 흰색 텍스트
        element.classList.remove('text-on-light');
      }
    });
  }, []);

  const notifications = [
    { nickname: '닉네임', comment: '새 댓글' },
    { nickname: '닉네임', comment: '다른 댓글' }
  ];

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };

  return (
    <Router>
      <div className="App">
        <div className="text" style={{ backgroundColor: '#ffffff' }}>
        </div>

        <div className="text" style={{ backgroundColor: '#333' }}>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route
            path="/Assignment"
            element={<Assignment onSubmit={handleFormSubmit} currentUser="1" notifications={notifications} />}
          />
          <Route path="/AssignmentDetail" element={<AssignmentDetail />} />
          <Route path="/project-detail" element={<ProjectDetail />} />
          <Route path="/MeetingLog" element={<MeetingLog />} />
          <Route path="/MeetingLogView" element={<MeetingLogView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
