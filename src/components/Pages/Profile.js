// components/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { errorMessage, successMessage } from '../../Util/CustomToast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faIdCard, faIdCardClip } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setFalse } from '../../reducer/boolean';
import { useNavigate } from 'react-router-dom';


function Profile() {
  const [id, setId] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchLocalStorage = () => {
    try {
      const localData = JSON.parse(localStorage.getItem('users'));
      return localData;
    } catch (err) {
      console.log("로컬 스토리지 접근 오류: ", err);
    }
  };
  const saveLocalStorage = (newPassword) => {
    try {
      const registeredUser = {
        email: id,
        password: newPassword
      };

      localStorage.setItem('users', JSON.stringify(registeredUser));
    } catch(err) {
      console.error("비밀번호 저장 실패 : ", err);
      throw err;  
    } 
  }

  const handlePasswordChange = () => {
    // 비밀번호 변경 로직 구현 (백엔드와 연결 필요)
    const passwordData = fetchLocalStorage().password;

    if(passwordData !== currentPassword) {
      errorMessage("현재 비밀번호가 일치하지 않습니다.");
      return;
    }
    // 새 비밀번호 확인
    if (newPassword !== newPasswordConfirm) {
      errorMessage("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
    // 백엔드와 연결하여 비밀번호 변경 요청 보내기
    saveLocalStorage(newPassword);
    successMessage("비밀번호가 변경되었습니다.");

    navigate('/');
  };

  const handleLogout = () => {
    localStorage.setItem('logged', JSON.stringify(false));
    dispatch(setFalse());
    setId("");
    successMessage("로그아웃 되었습니다.");

    navigate('/');
  };

  useEffect(() => {
    const idData = fetchLocalStorage();
    setId(idData.email);
  }, []);

  return (
    <div className="profile">
      <h2><FontAwesomeIcon icon={faIdCard} /></h2>
      <p><FontAwesomeIcon icon={faIdCardClip} />     {id}</p>

      <button className="logout-button" onClick={handleLogout}>로그아웃</button>  
      
      <div className="password-change">
        <h3 style={{background: 'transparent'}}>비밀번호 변경</h3>

        <div className="password">
          <label htmlFor="currentPassword">현재 비밀번호:</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            placeholder="현재 비밀번호를 입력하세요."
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="password">
          <label htmlFor="newPassword">새 비밀번호:</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            placeholder="새 비밀번호를 입력하세요."
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="password">
          <label htmlFor="newPasswordConfirm">새 비밀번호 확인:</label>
          <input
            id="newPasswordConfirm"
            type="password"
            value={newPasswordConfirm}
            placeholder=""
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
          />
        </div>

        <button onClick={handlePasswordChange}>비밀번호 변경</button>
      </div>

    </div>
  );
}

export default Profile;
