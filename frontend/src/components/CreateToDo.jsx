import { useState } from "react";
import axios from "axios";
const CreateToDo = ({ getTodoList }) => {
  const [title, setTitle] = useState("");

  const onSubmitCreateToDo = async (e) => {
    try {
      e.preventDefault();

      if (!title) {
        alert("타이틀을 입력해주세요");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todo`,
        {
          title: title,
          desc: `${title} 아자아자 화이팅`,
        }
      );
      if (response.status !== 200) {
        alert("요청을 불러오지 못했습니다.");
        return;
      }

      getTodoList();
      setTitle("");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="flex mt-2" onSubmit={onSubmitCreateToDo}>
      <input
        className="grow border-2 border-white rounded-lg focus:outline-red-400 px-2 py-1 text-lg text-black"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="ml-4 px-2 py-1 bg-white hover:bg-black hover:text-white rounded-lg text-black"
        type="submit"
        value={"새 투두 형성"}
      />
    </form>
  );
};

export default CreateToDo;
