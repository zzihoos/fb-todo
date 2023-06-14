import React, { useState } from "react";

const Form = ({ todoData, setTodoData }) => {
  console.log("Form 랜더링");
  // 새로운 할일 state 변수
  const [value, setValue] = useState("");

  //input type = "text" 의 value 변경 화면 리랜더링
  const handleChange = e => {
    setValue(e.target.value);
  };
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
    //로컬스토리지 저장
    localStorage.setItem("fbTodoData", JSON.stringify(todoData));
    //입력창 초기화
    setValue("");
  };
  return (
    <div>
      <form
        className="flex pt-2"
        style={{ display: "flex" }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="value"
          style={{ flex: "10", padding: "5px" }}
          placeholder="할일을 입력해주세요."
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        />
        <input
          type="submit"
          style={{ flex: "1" }}
          value="입력"
          className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
        />
      </form>
    </div>
  );
};

export default Form;
