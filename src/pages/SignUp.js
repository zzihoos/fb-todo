import React, { useState } from "react";
import SignUpDiv from "../style/UserCss";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const handleSignUp = e => {
    e.preventDefault();
    //firebase 에 회원가입 하기
  };

  return (
    <div className="p-6 mt-5 shadow rounded bg-white">
      <h2>Singup</h2>
      {/*
     1. emotion 을 활용하여 tag 의 용도를 구분한다.
     2. css 도 함께 적용한다.
     */}
      <SignUpDiv>
        <form className="shadow bg-white rounded">
          <label htmlFor="">이름</label>
          <input
            type="text"
            required
            value={nickName}
            onChange={e => setNickName(e.target.value)}
            maxLength={10}
            minLength={2}
          />
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
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
            minLength={8}
            maxLength={16}
          />
          <label htmlFor="">비밀번호 확인</label>
          <input
            type="password"
            value={pwConfirm}
            onChange={e => setPwConfirm(e.target.value)}
            required
            minLength={8}
            maxLength={16}
          />
          <div className="btn-list">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => handleSignUp(e)}
            >
              회원가입
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
            >
              취소
            </button>
          </div>
        </form>
      </SignUpDiv>
    </div>
  );
};

export default SignUp;