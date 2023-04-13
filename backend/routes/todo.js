const express = require("express");

let todoData = require("../todoData.json");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(todoData);
  res.json(todoData);
});

router.post("/", (req, res) => {
  const { title, desc } = req.body;
  //req.body는 인섬니아에서 그 바디부분 즉 요청자 입장에서 쓴 그 추가할 부분이 title desc 객체구조분해로 각각 title desc에 저장->객체구조분해는 프로퍼티값이 같게 써야함
  if (!title || !desc) {
    return res
      .status(400)
      .json({ error: "타이틀과 설명을 입력하셔야 합니다." });
  }

  todoData.push({ title: title, desc: desc, isDone: false });
  // todoData.push({ title, desc }); 키값 벨류값이 같으므로 생략가능
  // console.log(todoData);
  res.json(todoData);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;
  if (parseInt(id) >= todoData.length) {
    res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }
  if (!title && desc) {
    return res
      .status(400)
      .json({ error: "타이틀이나 설명 중에 하나의 값은 입력해야합니다" });
  }

  router.get("/:id", (req, res) => {
    const { id } = req.params;

    if (parseInt(id) >= todoData.length) {
      res.status(400).json({ error: "존재하지 않는 ID입니다." });
    }

    res.json(todoData[parseInt(id)]);
  });

  todoData[parseInt(id)] = {
    title: title ? title : todoData[parseInt(id)].title,
    desc: desc ? desc : todoData[parseInt(id)].desc,
    isDone: todoData[parseInt(id)].isDone,
  };
  //둘중 하나라도 안보냈을때 //

  res.json(todoData);
});

router.put("/done/:id", (req, res) => {
  const { id } = req.params;

  todoData[parseInt(id)] = {
    title: todoData[parseInt(id)].title,
    desc: todoData[parseInt(id)].desc,
    isDone: !todoData[parseInt(id)].isDone,
  };

  console.log(todoData);

  res.json(todoData);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (parseInt(id) >= todoData.length) {
    res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }
  todoData = todoData.filter((v, i) => {
    return parseInt(id) !== i;
    //id값이 0번이 아닌것만 돌려준다는것은 0번인것을 삭제한다는 의미다 i에 0부터 쭉넣어서 들어온 id값이랑 안같으면 그대로 다시 돌려주고 같아지는순간 그건 리턴 안한다 즉 삭제다
  });

  res.json(todoData);
});

module.exports = router;
