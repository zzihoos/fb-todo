import React, { useEffect, useState } from "react";
import { patchTitleTodo, patchCompletedTodo, deleteTodo } from "../axios/axios";

const ListItem = ({ item, todoData, setTodoData }) => {
  // console.log("ListItem 랜더링", item);

  // 편집 상태 설정 state
  const [isEdit, setIsEdit] = useState(false);
  // 편집 상태 타이틀 설정 state
  const [editTitle, setEditTitle] = useState(item.title);

  useEffect(() => {
    // setEditTitle(item.title);
  }, []);

  const getStyle = _completed => {
    return {
      padding: "10px",
      textDecoration: _completed ? "line-through" : "none",
    };
  };
  // 이벤트 핸들러
  const handleDeleteClick = _id => {
    // 전달된 ID를 검색해서 목록에서 제거
    // 1. 전달된 id로 해당하는 목록 찾아서 제외
    // 2. 새로운 목록으로 갱신해서 화면 리랜더링
    // 3. 배열의 고차함수 중 filter 를 사용
    const newTodoData = todoData.filter(item => item.id !== _id);
    setTodoData(newTodoData);
    // 로컬스토리지 저장
    // localStorage.setItem("fbTodoData", JSON.stringify(newTodoData));
    // axios delete 호출 fbtodolist 삭제하기
    // axiosInstance
    //   .delete(`/todos/${_id}`)
    //   .then(res=> res.data)
    //   .then(result => console.log(result))
    //   .catch(error => console.log(error));
    deleteTodo(_id);
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };
  const handleEditChange = e => {
    setEditTitle(e.target.value);
  };

  const handleCancelClick = () => {
    setIsEdit(false);
  };
  const handleSaveClick = _id => {
    let newTodoData = todoData.map(item => {
      if (item.id === _id) {
        item.title = editTitle;
        item.completed = false;
      }
      return item;
    });

    setTodoData(newTodoData);
    // patchCompletedTodo(_id, { ...item });
    // 로컬스토리지 저장
    // localStorage.setItem("fbTodoData", JSON.stringify(newTodoData));
    // axios patch/put 호출 fbtodolist 수정하기
    // console.log(_id,editTitle);
    // axiosInstance
    // .patch(`/todos/${_id}`, {title:editTitle})
    // .then(res => res.data)
    // .then(result => console.log(result))
    // .catch(error => console.log(error));
    patchTitleTodo(_id, editTitle);

    item.completed = false;
    
    setIsEdit(false);
  };

  const handleCompleteChange = _id => {
    // 전달할 flag
    // let _flag = false;
    // 중요한 것은 음.. id에 해당하는 것만 수정하면 되지 XXX
    // state 는 항상 새롭게 만든 내용 즉, 배열로 업데이트 해야 한다.
    // 새로운 배열을 만들어서 set 하자.
    let newTodoData = todoData.map(item => {
      if (item.id === _id) {
        // completed 를 갱신함.
        item.completed = !item.completed;
        // _flag = item.completed;
      }
      return item;
    });
    setTodoData(newTodoData);
    // 로컬스토리지 저장
    // localStorage.setItem("fbTodoData", JSON.stringify(newTodoData));
    //axios patch/put 호출 fbtodolist 수정하기
    patchCompletedTodo(_id, { ...item });
  };

  if (isEdit) {
    // 편집중
    return (
      <div className="flex items-center justify-between w-full mb-2 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
        <div className="items-center w-3/5">
          <input
            className="w-full px-3 py-2 mr-3 text-gray-500 rounded"
            type="text"
            defaultValue={item.title}
            // 개인적으로 좀 더 파악해 보자.
            // value={editTitle}
            onChange={e => handleEditChange(e)}
          />
        </div>
        <div className="items-center">
          <button className="px-4 py-2 float-right" onClick={handleCancelClick}>
            Cancle
          </button>
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleSaveClick(item.id)}
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    // 일반상태
    return (
      <div className="flex items-center justify-between w-full mb-2 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
        <div className="items-center flex" style={getStyle(item.completed)}>
          {/* defaultChecked : 체크박스에 기본체크 상태 설정 */}
          <input
            type="checkbox"
            defaultChecked={item.completed}
            value={item.completed}
            onChange={() => handleCompleteChange(item.id)}
          />
          <span className="ml-3">{item.title}</span>
        </div>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleDeleteClick(item.id)}
          >
            Delete
          </button>

          <button className="px-4 py-2 float-right" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </div>
    );
  }
};
// 리랜더링 최적화 적용
export default React.memo(ListItem);
