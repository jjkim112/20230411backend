const express = require("express");
const todoRouter = require("./routes/todo");
const app = express();
const cors = require("cors");

const port = 3030;

app.use(cors());
app.use(express.json());
app.use("/todo", todoRouter);
// app.use(
//   cors({
//     origin: "http://localhost:3020",
//     credentials: true,
//   })
// );
app.get("/", (req, res) => {
  res.send("Hello, kai");
});

app.listen(port, () => {
  console.log(`Sever listening on port: ${port}🥇`);
});
