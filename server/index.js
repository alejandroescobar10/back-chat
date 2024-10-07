import express from "express";
import { Realtime } from "ably/promises";

const app = express();
const ably = new Realtime({
  key: "6bgz8Q.pc07CQ:rjC34iblLGHkCAcy4YUVArd0gFn0cg4WKVuXgEKsNR4",
});

app.get("/api/auth", async (req, res) => {
  const clientId = req.query.clientId;

  try {
    const tokenRequest = await ably.auth.createTokenRequest({ clientId });
    res.status(200).json(tokenRequest);
  } catch (err) {
    res.status(500).send("Error requesting token: " + err);
  }
});

// El puerto aquí no se usa en Vercel pero es útil para desarrollo local
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
