// React 의 useContex 훅을 사용
// AuthContext 의 state 및 dispatch 함수를
// 가져오는 커스텀 훅
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { appAuth } from "../firebase/config";

// 가져오는 커스텀 훅 정의
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user;
      dispatch({ type: "login", payload: user });
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return { error, isPending, login };
};
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      // FB 로그아웃 API
      await signOut(appAuth);
      dispatch({ type: "logout" });
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return { error, isPending, logout };
};
// 로그인, 로그아웃, 회원가입 처리 상태를 위한 Custom Hook
export const useSignup = () => {
  // authContext 데이터 전달
  const { dispatch } = useAuthContext();

  // 사용자 상태에 따라 웹브라우저 라우터 이동
  const navigate = useNavigate();

  // 서버의 에러 상태를 보관
  const [error, setError] = useState(null);

  // 서버의 연결 시도 및 연결, 연결 후 상태를 보관
  const [isPending, setIsPending] = useState(false);

  // 실제 연결을 실행할 함수
  // signUp(이메일, 비밀번호, 닉네임)
  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      // 사용자 등록 시작
      const userCredential = await createUserWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log(user);
      if (!user) {
        // 에러 객체를 던진다.
        console.log("회원 가입에 실패하였습니다.");
        return;
      }
      // 성공시에는 사용자 닉네임을 설정한다.
      await updateProfile(appAuth.currentUser, {
        displayName: displayName,
        //   photoURL: "https://example.com/jane-q-user/profile.jpg",
      });
      dispatch({ type: "login", payload: user });
      // 에러 없음
      setError(null);
      // 연결 후 작업 완료
      setIsPending(false);
      // 회원가입 성공으로 login 라우터로 이동
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // 현재 error, isPending, signUp 을 리턴한다.
  return { error, isPending, signUp };
};
export const useUpdateNickName = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const updateNickName = async nickName => {
    setError(null);
    setIsPending(true);
    try {
      //FB의 닉네임 변경 API 사용
      await updateProfile(appAuth.currentUser, { displayName: nickName });
      dispatch({ type: "updateName", payload: appAuth.currentUser });
    } catch (err) {
      console.log(err.message);
      setError(null);
      setIsPending(false);
    }
  };

  return { error, isPending, updateNickName };
};
export const useUpdateEmail = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updateMail = async email => {
    setError(null);
    setIsPending(true);
    try {
      await updateEmail(appAuth.currentUser, email);

      setIsPending(false);
      dispatch({type: "updateEmail", payload: appAuth.currentUser});
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError(null);
    }
  };
  return { error, isPending, updateMail };
};
export const useUpdatePass = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updatePass = async newPass => {
    setError(null);
    setIsPending(true);
    try {
      await updatePassword(appAuth.currentUser, newPass);
			console.log("비밀번호 업데이트 완료");
      setIsPending(false);
    } catch (error) {
      console.log(error.message);
      setError(null);
      setIsPending(false);
    }
  };
  return { error, isPending, updatePass };
};
export const useUserDelete = () => {
	const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const userDelete = async () => {
    setError(null);
    setIsPending(true);
    try {
      await deleteUser(appAuth.currentUser)
      setIsPending(false);
      dispatch({type: "deleteUser"});
			navigate("/");
    } catch (err) {
      console.log(err.message);
      setIsPending(false);
      setError(err.message);
    }
  };

  return { error, isPending, userDelete };
};