import express from "express";
import cors from "cors";
import notesRouter from "./routes/notes.js";
import authRouter from "./routes/auth.js";
import webhooksRouter from "./routes/webhooks.js";
import { getConnectionInfo } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "acme-notes-api",
    db: getConnectionInfo(),
  });
});

app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);
app.use("/api/webhooks", webhooksRouter);

app.listen(PORT, () => {
  console.log(`Acme Notes API listening on http://localhost:${PORT}`);
});

export default app;
