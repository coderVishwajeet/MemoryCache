const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

let cacheDataList = [];

//get-api
app.get("/my-redis", (req, res) => {
  res.status(200).json(cacheDataList);
});

//post-api
app.post("/my-redis", (req, res) => {
  let isCachePresent = cacheDataList.find(i => {
    return Object.keys(i)[0] == Object.keys(req.body)[0];
  });
  if (isCachePresent) {
    return res.status(400).json({ error: "Failed!, Key already exists" });
  }
  cacheDataList.push(req.body);
  return res
    .status(200)
    .json({ message: "Success!, Key-Value Pair has been added." });
});

//put-api
app.put("/my-redis/:key", (req, res) => {
  const { key } = req.params;
  let cacheIndex = cacheDataList.findIndex(i => {
    return Object.keys(i)[0] == key;
  });

  if (cacheIndex == -1) {
    return res.status(400).json({ error: "Failed!, Key does not exists" });
  }

  cacheDataList[cacheIndex][key]++;
  return res
    .status(200)
    .json({ message: "Success!, Key-Value Pair has been updated." });
});

//delete-api
app.delete("/my-redis/:key", (req, res) => {
  const { key } = req.params;
  let cacheIndex = cacheDataList.findIndex(i => {
    return Object.keys(i)[0] == key;
  });

  if (cacheIndex == -1 || key == null) {
    return res.status(400).json({ error: "Failed!, Key does not exists" });
  }

  cacheDataList.splice(cacheIndex, 1);
  return res
    .status(200)
    .json({ message: "Success!, Key-Value Pair has been deleted." });
});

app.listen(3000, () => console.log("Server has been started..."));
