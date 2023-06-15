import React, { useState } from "react";

const ListItem = ({ item, todoData, setTodoData }) => {
  // 편집 상태 설정 state
  const [isEdit, setIsEdit] = useState(false);
  const getStyle = _completed => {
    return {
      padding: "10px",
      textDecoration: _completed ? "line-through" : "none",
      // 기본값이 true이라서 줄이 쳐진다.
    };
  };
  // 이벤트 핸들러

  const handleEditClick = _id => {
    console.log(_id);
  };
  const handleDeleteClick = _id => {
    setIsEdit(true);
    console.log(_id);
  };
  const handleCompleteChange = _id => {
    let newTodoData = todoData.map(item => {
      if (item.id === _id) {
        item.completed = !item.completed;
        // completed 갱신 및 !는 반대값
      }
      return item;
    });
    setTodoData(newTodoData);
  };

  if (isEdit) {
    //편집중
    return (
      <div className="flex- items-center justify-between w-full mb-2 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
        {/* key 는 반복문에서 unique 해야 한다 */}
        <div className="items-center" style={getStyle(item.completed)}>
          {/* defaultChecked : 체크박스에 기본체크 상태 설정 */}
          <input
            type="checkbox"
            defaultChecked={item.completed}
            onChange={() => handleCompleteChange(item.id)}
          />
          {item.title}
        </div>
        <div className="items-center">
          {/* 재료(item.id)를 즉시전달하는것을 방지 하기 위해 화살표 함수를 쓴다 */}
          <button className="px-4 py-2 float-right" onClick={handleCancelClick}>
            Cancle
          </button>

          <button
            className="px-4 py-2 float-right"
            onClick={() => handleEditClick(item.id)}
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    // 일반상태
    return (
      <div className="flex- items-center justify-between w-full mb-2 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
        {/* key 는 반복문에서 unique 해야 한다 */}
        <div className="items-center" style={getStyle(item.completed)}>
          {/* defaultChecked : 체크박스에 기본체크 상태 설정 */}
          <input
            type="checkbox"
            defaultChecked={item.completed}
            onChange={() => handleCompleteChange(item.id)}
          />
          {item.title}
        </div>
        <div className="items-center">
          {/* 재료(item.id)를 즉시전달하는것을 방지 하기 위해 화살표 함수를 쓴다 */}
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleDeleteClick(item.id)}
          >
            Delete
          </button>

          <button
            className="px-4 py-2 float-right"
            onClick={() => handleEditClick(item.id)}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
};

// 리랜더링 최적화 적용
export default React.memo(ListItem);
