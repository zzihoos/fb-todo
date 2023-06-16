import React, { useState } from "react";
import { LoginDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";

const Login = ({setFbName,setFbEmail,setFbUid}) => {
  // Link, NavLink, useNaviage
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 로그인
  const handleLogin = async e => {
    e.preventDefault();
    // Firebase 로그인 시도
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      //로그인 된 사용자 정보를 가지고 옴
      const user = firebase.auth().currentUser;
      console.log("로그인 성공");
      console.log(user);
      setFbName(user.displayName);
      setFbEmail(user.email);
      setFbUid(user.uid);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        alert("올바른 이메일 형식이 아닙니다.");
      } else if (error.code === "auth/wrong-password") {
        alert("올바르지 않은 비밀번호입니다.");
      } else if (error.code === "auth/user-not-found") {
        alert("가입되지 않은 사용자입니다.");
      } else if (error.code === "auth/missing-email") {
        alert("가입되지 않은 이메일입니다.");
       } else {
        alert("로그인이 실패하였습니다.");
      }
    }
  };
  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white">
      <h2>Login</h2>
      {/* 
        1. emotion 을 활용하여 tag 의 용도를 구분한다. 
        2. css 도 함께 적용한다.
      */}
      <LoginDiv>
        <form>
          <label htmlFor="">이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
            maxLength={16}
          />

          <div className="flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => handleLogin(e)}
            >
              로그인
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              회원가입
            </button>
            <button className="border rounded px-3 py-2 shadow">
              비밀번호 찾기
            </button>
          </div>
        </form>
      </LoginDiv>
    </div>
  );
};

export default Login;
