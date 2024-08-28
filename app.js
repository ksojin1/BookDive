const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, "front/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/front/build/index.html"));
});

// 리액트 라우터 접근
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/front/build/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중..");
});
