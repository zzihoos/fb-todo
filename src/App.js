import { useState } from "react";
import "./App.css";

function App() {
  // 더미 데이터 일반변수
  const [todoData, setTodoData] = useState([
    { id: 1, title: "할일 1", completed: true },
    { id: 2, title: "할일 2", completed: false },
    { id: 3, title: "할일 3", completed: true },
    { id: 4, title: "할일 4", completed: true },
  ]);

  // 새로운 할일 state 변수
  const [value, setValue] = useState("");

  const btnStyle = {
    color: "#fff",
    float: "right",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
  };
  const getStyle = _completed => {
    return {
      padding: "10px",
      borderBottom: "1px dotted #ccc",
      textDecoration: _completed ? "line-through" : "none",
    };
  };
  //이벤트 핸들러
  const handleClick = _id => {
    // 전달된 ID를 검색해서 목록에서 제거
    // 1. 전달된 id로 해당하는 목록 찾아서 제외
    // 2. 새로운 목록으로 갱신해서 화면 리랜더링
    // 3. 배열의 고차함수 중 filter 를 사용
    const newTodoData = todoData.filter(item => item.id !== _id);
    setTodoData(newTodoData);
  };

  //input type = "text" 의 value 변경 화면 리랜더링
  const handleChange = e => {
    setValue(e.target.value);
  };
  // form submit 실행시 체크
  const handleSubmit = e => {
    //웹 브라우저로 데이터 전송을 막아야함.
    //마치 a 태그의 href를 막아주듯이
    e.preventDefault();
    //새로운 todo 객체를 만들어준다.
    // 형식 즉, 키명의 구조를 지켜줌.
    const newTodo = { id: Date.now(), title: value, completed: false };
    //state 저장한다. 화면 리랜더링 된다.
    //todoData 에 추가.
    setTodoData([...todoData, newTodo]);
    //입력창 초기화
    setValue("");
  };

  const handleCompleteChange = _id => {
    // 중요한 것은 id의 해당하는 것만 수정하면 된다 xxx
    // state 는 항상 새롭게 만든 내용 즉, 배열로 업데이트 해야 한다.
    // 새로운 배열을 만들어서 set 하자.
    let newTodoData = todoData.map((item) => {
      if(item.id === _id){
        //completed를 갱신
        item.completed = !item.completed;
      }
      return item;
    });
    setTodoData(newTodoData);
  };

  return (
    <>
      <div className="container">
        <div className="todo-block">
          <div className="title">
            <h1>할일목록</h1>
          </div>
          {/* 할일 메인 */}
          {todoData.map(item => (
            // key 는 반복문에서 unique 해야한다.
            <div style={getStyle(item.completed)} key={item.id}>
              {/* defaultChecked : 체크박스에 기본체크 상태 설정 */}
              <input
                type="checkbox"
                defaultChecked={item.completed}
                onChange={() => handleCompleteChange(item.id)}
              />
              {item.title}
              <button style={btnStyle} onClick={() => handleClick(item.id)}>
                X
              </button>
            </div>
          ))}
          {/* 할일 추가 */}
          <div>
            <form style={{ display: "flex" }} onSubmit={handleSubmit}>
              <input
                type="text"
                name="value"
                style={{ flex: "10", padding: "5px" }}
                placeholder="할일을 입력해주세요."
                value={value}
                onChange={handleChange}
              />
              <input type="submit" style={{ flex: "1" }} value="입력" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
