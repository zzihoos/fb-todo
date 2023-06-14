import { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  console.log("App 랜더링");
  // 더미 데이터 일반변수
  const [todoData, setTodoData] = useState([
    { id: 1, title: "할일 1", completed: true },
    { id: 2, title: "할일 2", completed: false },
    { id: 3, title: "할일 3", completed: true },
    { id: 4, title: "할일 4", completed: true },
  ]);

  const handleRemoveClick = () => {
    setTodoData([]);
  }

  //이벤트 핸들러
  // const handleClick = _id => {
  //   // 전달된 ID를 검색해서 목록에서 제거
  //   // 1. 전달된 id로 해당하는 목록 찾아서 제외
  //   // 2. 새로운 목록으로 갱신해서 화면 리랜더링
  //   // 3. 배열의 고차함수 중 filter 를 사용
  //   const newTodoData = todoData.filter(item => item.id !== _id);
  //   setTodoData(newTodoData);
  // };

  // form submit 실행시 체크

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-300">
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
        <div className="flex justify-between mb-3">
          <h1 className="text-center w-3/4 text-2xl text-red-600 font-semibold">
            Firebase Todo-List
          </h1>
          <button onClick={handleRemoveClick} className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400 text-[12px]">Delete All</button>
        </div>
        {/* 할일 메인 */}
        <List todoData={todoData} setTodoData={setTodoData} />
        {/* 할일 추가 */}
        <Form todoData={todoData} setTodoData={setTodoData} />
      </div>
    </div>
  );
}

export default App;
