import express from "express";
import { AblyRest } from "ably/promises";

const app = express();
const ably = new AblyRest({
  key: "6bgz8Q.pc07CQ:rjC34iblLGHkCAcy4YUVArd0gFn0cg4WKVuXgEKsNR4",
});

app.get("/auth", (req, res) => {
  const clientId = req.query.clientId;
  ably.auth.createTokenRequest({ clientId }, (err, tokenRequest) => {
    if (err) {
      res.status(500).send("Error requesting token: " + err);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(tokenRequest));
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
