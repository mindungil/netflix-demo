// src/components/Auth/Signin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import { toast } from 'react-toastify';

function Signin({ toggleAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // localStorage에서 등록된 사용자 정보를 가져옴
    const userKey = localStorage.getItem('registeredUser');
    let userData = null;
  
    if (userKey) {
      try {
        userData = JSON.parse(userKey);
        console.log('User data found:', userData); // 디버깅 로그 추가
      } catch (error) {
        console.error('JSON 파싱 오류:', error);
        toast.error('데이터를 불러오는데 실패하였습니다.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }
    } else {
      console.log('No user data found');
    }
  
    if (!userData || email !== userData.email || password !== userData.password) {
      console.log('로그인 실패 조건 실행');
      toast.error('아이디 또는 비밀번호를 확인하세요.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
      console.log('로그인 성공 조건 실행');
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('로그인 성공', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      navigate('/');
    }
  };  

  return (
    <div className="signin-container">
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input type="checkbox" /> Remember me
      </label>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={toggleAuth}>회원가입</button>
    </div>
  );
}

export default Signin;