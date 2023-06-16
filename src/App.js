import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";
import { useState } from "react";

function App() {
  // console.log("App 랜더링");
  // 추후에 Redux/Recoil state 로 관리 필요
  const [fbName, setFbName] = useState("");
  const [fbEmail, setFbEmail] = useState("");
  const [fbUid, setFbUid] = useState("");

  return (
    <div className="w-screen h-screen bg-blue-300 overflow-x-hidden">
      <Header
        fbName={fbName}
        fbEmail={fbEmail}
        fbUid={fbUid}
        setFbName={setFbName}
        setFbEmail={setFbEmail}
        setFbUid={setFbUid}
      />
      <div className="container mx-auto h-full">
        <Routes>
          {/* Navigate 를 이용한 강제 이동 */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={
              <Login
                setFbName={setFbName}
                setFbEmail={setFbEmail}
                setFbUid={setFbUid}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/todo"
            element={<Todo fbName={fbName} fbEmail={fbEmail} fbUid={fbUid} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/mypage"
            element={
              <MyPage
                fbName={fbName}
                fbEmail={fbEmail}
                fbUid={fbUid}
                setFbName={setFbName}
                setFbEmail={setFbEmail}
                setFbUid={setFbUid}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
