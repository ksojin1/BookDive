const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 5000);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중..");
});

// https://velog.io/@kcj_dev96/%ED%94%84%EB%A1%A0%ED%8A%B8-%EB%B0%B0%ED%8F%AC-%EB%B0%A9%EB%B2%95-1%ED%8E%B8AWS-EC2-with-React-Express-%ED%99%98%EA%B2%BD