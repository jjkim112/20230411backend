import axios from "axios";
import TodoCard from "./components/TodoCard";
import { useEffect, useState } from "react";
import CreateToDo from "./components/CreateToDo";

function App() {
  const [toDoList, setToDoList] = useState();

  const getTodoList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo`
      );
      if (response.status !== 200) {
        alert("요청을 불러오지 못했습니다");
        return;
      }

      setToDoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //유즈이펙트 안에는 비동기 처리를 못하므로 따로 함수를빼줘야한다 async는 따로 함수로 만들어서 유즈이펙트 안에 넣어야한다

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-16 text-white bg-black">
      <h1 className="text-4xl font-bold">☀️ULTRA POWER RISING TO DO LIST 📅</h1>
      <div>
        <div className="mt-8 text-sm font-semibold">
          Always bear in mind that your own resolution to succeed is more
          important than any one thing.
        </div>
        <div className="texs-xs pl-7">
          늘 명심하라. 성공하겠다는 너 자신의 결심이 다른 어떤 것보다 중요하다는
          것을.
        </div>
        <CreateToDo getTodoList={getTodoList} />
        <ul className="mt-16 flex flex-col w-1/2">
          {toDoList &&
            toDoList.map((v, i) => {
              return (
                <TodoCard
                  title={v.title}
                  key={i}
                  index={i}
                  isDone={v.isDone}
                  getTodoList={getTodoList}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}
export default App;
