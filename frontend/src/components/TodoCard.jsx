import axios from "axios";

const TodoCard = ({ title, isDone, index, getTodoList }) => {
  const onClickToggle = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/todo/done/${index}`
      );
      if (response.status !== 200) {
        alert("요청을 불러오지 못했습니다.");
        return;
      }
      getTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${index}`
      );
      if (response.status !== 200) {
        alert("요청을 불러오지 못했습니다.");
        return;
      }
      getTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isDone ? (
        <li className="flex my-4 ">
          <div onClick={onClickToggle} className="flex my-4">
            <div className="relative">
              <div className="border-4 bg-white border-white w-8 h-8 rounded-xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white bg-black w-8 h-8  rounded-xl scale-75 "></div>
              {/* 체크하는 네모표시를 그려서 표현 */}
            </div>
            <div className="text-2xl ml-4">{title}</div>
          </div>
          <button className="ml-2" onClick={onClickDelete}>
            삭제
          </button>
        </li>
      ) : (
        <li className="flex my-4">
          <div onClick={onClickToggle} className="flex my-4">
            <div className="border-4 w-8 h-8 rounded-xl bg-white border-white"></div>
            <div className="text-2xl ml-4">{title}</div>
          </div>
          <button className="ml-2" onClick={onClickDelete}>
            삭제
          </button>
        </li>
      )}
    </>
  );
};

export default TodoCard;
